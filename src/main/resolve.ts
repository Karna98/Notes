/**
 * resolve.ts
 *
 * Description:
 *    Resolving request received on main processs and returning response.
 *
 */

import { CONSTANT, createMessage, IPCResponseObject } from '../common';
import CONFIG from './config';
import { resolveAuth, resolveAuthPin, resolveCredential } from './service';
import database from './sql';
import { resolveURI } from './util';

// Temporary Types.
type SpacesRequestDataType =
  | Pick<SpacesTableInterface, 'space_name'>
  | Pick<SpacesTableInterface, '_id'>;

type NotesRequestDataType = OptionalExceptFor<
  NotesTableInterface,
  '_id' | 'space_id' | 'note'
>;

// Constant Endpoint String.
const { ENDPOINT } = CONSTANT;

/**
 * Handles Spaces related requests.
 *
 * @param requestType
 * @param requestData
 * @returns {{data, message}} Data/Result and message regarding the request fulfillment.
 */
const spacesRequest = (
  requestType: string[],
  requestData: SpacesRequestDataType
): SubRequestResponseType => {
  let result: unknown, message: MessageInterface;

  switch (requestType[1]) {
    case ENDPOINT.GET:
      result = {
        metaData: {
          SPACES_MAX_COUNT_ALLOWED: CONFIG.SPACES_MAX_COUNT_ALLOWED,
        },
        // Get all spaces.
        list: database.getSpaces(),
      };

      message = createMessage('success');
      break;

    case ENDPOINT.ADD:
      requestData = requestData as Pick<SpacesTableInterface, 'space_name'>;

      const createStatus = database.createNewSpace(requestData.space_name);

      message = createStatus.changes
        ? // Space Added Successfully.
          createMessage(
            'success',
            `${requestData.space_name} Space added successfully.`
          )
        : // Error while adding Space.
          createMessage(
            'server-error',
            `Error while adding ${requestData.space_name} Space.`
          );

      if (createStatus.changes) {
        // Get newly inserted Space.
        result = database.getSpaceWithId(createStatus.lastInsertRowid);
      }
      break;

    case ENDPOINT.GET_SPACE:
      requestData = requestData as Pick<SpacesTableInterface, '_id'>;

      // Get all Notes.
      const notesList: NotesTableInterface[] = database.getNotes(
        requestData._id
      );

      // Get all Credentials.
      const credentialsList: CredentialsTableInterface[] =
        database.getCredentials(requestData._id);

      // Converting to type of NoteStoreType[] from NotesTableInterface[].
      const notesListMapped: NoteStoreType[] = notesList.map(
        ({ _id, note, updated_at }: NotesTableInterface) => ({
          _id,
          note,
          updated_at,
        })
      );

      // Converting to type of CredentialStoreType[] from CredentialsTableInterface[].
      const credentialsListMapped: CredentialDataType[] = credentialsList.map(
        ({ _id, credential, updated_at }: CredentialsTableInterface) => {
          const parsedCredential: CredentialBodyType = JSON.parse(credential);
          return {
            _id,
            credential: { title: parsedCredential.title },
            updated_at,
          } as CredentialDataType;
        }
      );

      // Get all data related to Space ID.
      result = {
        space_id: requestData._id,
        notes: notesListMapped,
        credentials: credentialsListMapped,
      };

      message = createMessage('success');
      break;

    default:
      // Invalid Sub Request.
      message = createMessage('client-error', 'Invalid Request');
      break;
  }

  return { data: result, message };
};

/**
 * Handles Notes related requests.
 *
 * @param requestType
 * @param requestData
 * @returns {{data, message}} Data/Result and message regarding the request fulfillment.
 */
const notesRequest = (
  requestType: string[],
  requestData: NotesRequestDataType
): SubRequestResponseType => {
  let result: unknown, message: MessageInterface;

  switch (requestType[1]) {
    case ENDPOINT.ADD:
      const createStatus = database.createNewNote(
        requestData.space_id,
        requestData.note
      );

      message = createStatus.changes
        ? // Note Added Successfully.
          createMessage('success')
        : // Error while adding Note.
          createMessage('server-error', `Error while adding note.`);

      if (createStatus.changes) {
        // Get newly inserted Note.
        result = database.getNoteWithId(createStatus.lastInsertRowid);
      }
      break;

    case ENDPOINT.UPDATE:
      // Update note.
      const updateStatus = database.updateNote(
        { note: requestData.note, updated_at: requestData.updated_at },
        requestData._id
      );

      message = updateStatus
        ? // Note updated Successfully.
          createMessage('success')
        : // Error while updating Note.
          createMessage('server-error', `Error while saving note.`);

      if (updateStatus)
        result = {
          _id: requestData._id,
          note: requestData.note,
          updated_at: requestData.updated_at,
        };

      break;

    default:
      // Invalid Sub Request.
      message = createMessage('client-error', 'Invalid Request');
      break;
  }

  return { data: result, message };
};

/**
 * This functions resolves all the request received from renderer on main process.
 *
 * @param request
 * @returns {IPCResponseObject} IPC Response Object to be sent to renderer process.
 */
const resolveRequest = (request: IPCRequestInterface): IPCResponseInterface => {
  let resolvedSubRequest: SubRequestResponseType = {
    data: undefined,
    message: undefined,
  };

  // Resolve Request URI
  const requestSubURI: string[] = resolveURI(request.URI);

  switch (requestSubURI[0]) {
    case ENDPOINT.AUTH:
      resolveAuth(
        requestSubURI,
        request.data as AuthCredentialType,
        resolvedSubRequest
      );
      break;

    case ENDPOINT.AUTH_PIN:
      const requestData = request.data as AuthPinRequestType;

      if (requestData.l_pin != undefined)
        resolveAuthPin(requestSubURI, requestData, resolvedSubRequest);

      if (
        requestData.data != undefined &&
        (requestData.l_pin == undefined ||
          resolvedSubRequest.message?.status == 200)
      )
        resolveCredential(
          [``, `GET`],
          request.data as CredentialRequestType,
          resolvedSubRequest
        );
      break;

    case ENDPOINT.SPACES:
      resolvedSubRequest = spacesRequest(
        requestSubURI,
        <SpacesRequestDataType>request.data
      );
      break;

    case ENDPOINT.NOTES:
      resolvedSubRequest = notesRequest(
        requestSubURI,
        <NotesRequestDataType>request.data
      );
      break;

    case ENDPOINT.CREDENTIAL:
      resolveCredential(
        requestSubURI,
        request.data as CredentialRequestType,
        resolvedSubRequest
      );
      break;

    default:
      resolvedSubRequest = {
        data: -1,
        message: createMessage('client-error', 'Invalid Request'),
      };
      break;
  }

  // If message is still undefined then throw client error.
  if (resolvedSubRequest.message == undefined)
    resolvedSubRequest.message = createMessage(
      'client-error',
      'Invalid Request'
    );

  return IPCResponseObject(
    request.URI,
    request.timestamp,
    resolvedSubRequest.message,
    resolvedSubRequest.data
  );
};

export default resolveRequest;

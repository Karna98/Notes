/**
 * resolve.ts
 *
 * Description:
 *    Resolving request received on main processs and returning response.
 *
 */

import { createMessage, IPCResponseObject, resolveRoute } from '../common';
import CONSTANTS from './constants';
import { cryptBcryptCompare, cryptBcryptHash } from './secure-util';
import database from './sql';

// Temporary Types.
type SpacesRequestDataType =
  | Pick<SpacesTableInterface, 'space_name'>
  | Pick<SpacesTableInterface, '_id'>;

type NotesRequestDataType = OptionalExceptFor<
  NotesTableInterface,
  '_id' | 'space_id' | 'note'
>;

type CredentialsRequestDataType = OptionalExceptFor<
  CredentialsTableInterface,
  '_id' | 'space_id' | 'credential'
>;

type resolvedSubRequestType = { data: unknown; message: MessageInterface };

/**
 * Handles Authentication related requests.
 *
 * @param requestType
 * @param requestData
 * @returns {{data, message}} Data/Result and message regarding the request fulfillment.
 */
const authRequest = (
  requestType: string[],
  requestData: AuthCredentialType
): resolvedSubRequestType => {
  let result: unknown, message: MessageInterface;

  switch (requestType[1]) {
    case `STATUS`:
      // Check if database exists
      if (database.checkIfDbExsts()) {
        // Update database if Schema is outdated.
        database.updateDatabase();

        // Get Users Count from Database.
        result = database.getUsersCount();
        message = createMessage('success');
      } else {
        // Set result to 0 if no Database found.
        result = 0;
        message = createMessage('success');
      }
      break;

    case `REGISTER`:
      // Intialize Database.
      !database.checkIfDbExsts() && database.init();

      result = database.createNewUser(
        cryptBcryptHash(requestData.username),
        cryptBcryptHash(requestData.password)
      );

      message = result
        ? // Registration Successful.
          createMessage('success', 'User Registered Successfully.')
        : // Registration Failure.
          createMessage('server-error', 'User Registration failed.');

      break;

    case `LOGIN`:
      const registeredUsers = database.getUsers();

      const loginStatus =
        cryptBcryptCompare(requestData.username, registeredUsers.username) &&
        cryptBcryptCompare(requestData.password, registeredUsers.password);

      if (loginStatus) {
        // Update Last Login time.
        database.updateUser(
          { last_logged_in: Date.now() },
          registeredUsers._id
        );

        // Create Session Object.
        result = {
          _id: registeredUsers._id,
          username: requestData.username,
          created_at: registeredUsers.created_at,
          last_logged_in: registeredUsers.last_logged_in,
        };
      }

      message = loginStatus
        ? // Login Successful.
          createMessage('success', 'Login Successful.')
        : // Login Failure.
          createMessage('client-error', 'Wrong Credentials.');
      break;

    default:
      // Invalid Sub Request.
      message = createMessage('client-error', 'Invalid Request');
      break;
  }
  return { data: result, message };
};

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
): resolvedSubRequestType => {
  let result: unknown, message: MessageInterface;

  switch (requestType[1]) {
    case `GET`:
      result = {
        metaData: {
          SPACES_MAX_COUNT_ALLOWED: CONSTANTS.SPACES_MAX_COUNT_ALLOWED,
        },
        // Get all spaces.
        list: database.getSpaces(),
      };

      message = createMessage('success');
      break;

    case `ADD`:
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

    case `GET_SPACE`:
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
      const credentialsListMapped: CredentialStoreType[] = credentialsList.map(
        ({ _id, credential, updated_at }: CredentialsTableInterface) => ({
          _id,
          credential: JSON.parse(credential),
          updated_at,
        })
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
): resolvedSubRequestType => {
  let result: unknown, message: MessageInterface;

  switch (requestType[1]) {
    case `ADD`:
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

    case `UPDATE`:
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
 * Handles Credentials related requests.
 *
 * @param requestType
 * @param requestData
 * @returns {{data, message}} Data/Result and message regarding the request fulfillment.
 */
const credentialsRequest = (
  requestType: string[],
  requestData: CredentialsRequestDataType
): resolvedSubRequestType => {
  let result: unknown, message: MessageInterface;

  switch (requestType[1]) {
    case `ADD`:
      const createStatus = database.createNewCredential(
        requestData.space_id,
        JSON.stringify(requestData.credential)
      );

      message = createStatus.changes
        ? // Credential Added Successfully.
          createMessage('success')
        : // Error while updating Credential.
          createMessage('server-error', `Error while adding credential.`);

      if (createStatus.changes) {
        // Get newly inserted Credential.
        result = database.getCredentialWithId(createStatus.lastInsertRowid);
      }
      break;

    case `UPDATE`:
      // Update Credential.
      const updateStatus = database.updateCredential(
        {
          credential: JSON.stringify(requestData.credential),
          updated_at: requestData.updated_at,
        },
        requestData._id
      );

      message = updateStatus
        ? // Credential updated Successfully.
          createMessage('success')
        : // Error while updating Credential.
          createMessage('server-error', `Error while saving credential.`);

      if (updateStatus)
        result = {
          _id: requestData._id,
          credential: requestData.credential,
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
  let resolvedSubRequest: resolvedSubRequestType;

  // Resolve Request URI
  const requestSubURI = resolveRoute(request.URI);

  switch (requestSubURI[0]) {
    case `AUTH`:
      resolvedSubRequest = authRequest(
        requestSubURI,
        <AuthCredentialType>request.data
      );
      break;

    case `SPACES`:
      resolvedSubRequest = spacesRequest(
        requestSubURI,
        <SpacesRequestDataType>request.data
      );
      break;

    case `NOTES`:
      resolvedSubRequest = notesRequest(
        requestSubURI,
        <NotesRequestDataType>request.data
      );
      break;

    case `CREDENTIALS`:
      resolvedSubRequest = credentialsRequest(
        requestSubURI,
        <CredentialsRequestDataType>request.data
      );
      break;

    default:
      resolvedSubRequest = {
        data: -1,
        message: createMessage('client-error', 'Invalid Request'),
      };
      console.log(`Invalid Request`);
      break;
  }

  return IPCResponseObject(
    request.URI,
    request.timestamp,
    resolvedSubRequest.message,
    resolvedSubRequest.data
  );
};

export default resolveRequest;

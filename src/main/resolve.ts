/**
 * resolve.ts
 *
 * Description:
 *    Resolving request received on main processs and returning response.
 *
 */

import { resolveRoute } from '../common/routes';
import { createMessage, IPCResponseObject } from '../common/util';
import CONSTANTS from './constants';
import { cryptBcryptCompare, cryptBcryptHash } from './secure-util';
import database from './sql/database';

/**
 * Handles Authentication related requests.
 *
 * @param requestType
 * @param requestData
 * @returns {[result, message]} Result and message regarding the request fulfillment.
 */
const authRequest = (
  requestType: string[],
  requestData: AuthCredentialType
): [result: unknown, message: MessageInterface] => {
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
      database.init();

      result = database.createNewUser(
        cryptBcryptHash(requestData.username),
        cryptBcryptHash(requestData.password)
      );

      if (result) {
        // Registration Successful.
        message = createMessage('success', 'User Registered Successfully.');
      } else {
        // Registration Failure.
        message = createMessage('server-error', 'User Registration failed.');
      }
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

        // Session Data to be stored.
        result = {
          _id: registeredUsers._id,
          username: requestData.username,
          created_at: registeredUsers.created_at,
          last_logged_in: registeredUsers.last_logged_in,
        };
      }

      message = loginStatus
        ? createMessage('success', 'Login Successful.')
        : createMessage('client-error', 'Wrong Credentials.');
      break;

    default:
      // Invalid Sub Request.
      message = createMessage('client-error', 'Invalid Request');
      break;
  }
  return [result, message];
};

/**
 * Handles Spaces related requests.
 *
 * @param requestType
 * @param requestData
 * @returns {[result, message]} Result and message regarding the request fulfillment.
 */
const spacesRequest = (
  requestType: string[],
  requestData: Pick<SpacesTableInterface, 'space_name'>
): [result: unknown, message: MessageInterface] => {
  const result: SpacesInterface = {
    metaData: { SPACES_MAX_COUNT_ALLOWED: CONSTANTS.SPACES_MAX_COUNT_ALLOWED },
    list: [],
  };
  let message: MessageInterface;

  switch (requestType[1]) {
    case `GET`:
      // Get all spaces.
      result.list = database.getSpaces();

      message = createMessage('success');
      break;

    case `ADD`:
      const createStatus = database.createNewSpace(requestData.space_name);

      if (createStatus) {
        // Get all spaces.
        result.list = database.getSpaces();

        message = createMessage(
          'success',
          `${requestData.space_name} Space added successfully.`
        );
      } else {
        // Error while adding spaces.
        message = createMessage(
          'server-error',
          `Error while adding ${requestData.space_name} Space.`
        );
      }
      break;

    default:
      // Invalid Sub Request.
      message = createMessage('client-error', 'Invalid Request');
      break;
  }

  return [result, message];
};

/**
 * Handles Notes related requests.
 *
 * @param requestType
 * @param requestData
 * @returns {[result, message]} Result and message regarding the request fulfillment.
 */
const notesRequest = (
  requestType: string[],
  requestData: OptionalExceptFor<
    NotesTableInterface,
    'space_id' | 'note' | '_id'
  >
): [result: unknown, message: MessageInterface] => {
  let result, message: MessageInterface;

  switch (requestType[1]) {
    case `GET`:
      // Get all Notes.
      result = database.getNotes(requestData?.space_id);
      message = createMessage('success');
      break;

    case `ADD`:
      const createStatus = database.createNewNote(
        requestData.space_id,
        requestData.note
      );

      message = createStatus.changes
        ? createMessage('success')
        : createMessage('server-error', `Error while adding Note.`);

      if (createStatus.changes) {
        // Get all Notes.
        result = database.getNoteWithId(createStatus.lastInsertRowid);
      }
      break;

    case `UPDATE`:
      // Update note.
      result = database.updateNote(
        { note: requestData.note, updated_at: requestData.updated_at },
        requestData._id
      );

      message = result
        ? createMessage('success')
        : createMessage('server-error', `Error while saving notes.`);

      break;

    default:
      // Invalid Sub Request.
      message = createMessage('client-error', 'Invalid Request');
      break;
  }

  return [result, message];
};

/**
 * This functions resolves all the request received from renderer on main process.
 *
 * @param request
 * @returns {IPCResponseObject} IPC Response Object to be sent to renderer process.
 */
const resolveRequest = (request: IPCRequestInterface): IPCResponseInterface => {
  let data: unknown, message: MessageInterface;

  // Resolve Request URI
  const requestSubURI = resolveRoute(request.URI);

  switch (requestSubURI[0]) {
    case `AUTH`:
      [data, message] = authRequest(
        requestSubURI,
        <AuthCredentialType>request.data
      );
      break;

    case `SPACES`:
      [data, message] = spacesRequest(
        requestSubURI,
        <Pick<SpacesTableInterface, 'space_name'>>request.data
      );
      break;

    case `NOTES`:
      [data, message] = notesRequest(
        requestSubURI,
        <Pick<NotesTableInterface, 'space_id' | 'note' | '_id'>>request.data
      );
      break;

    default:
      [data, message] = [-1, createMessage('client-error', 'Invalid Request')];
      console.log(`Invalid Request`);
      break;
  }

  return IPCResponseObject(request.URI, request.timestamp, message, data);
};

export default resolveRequest;

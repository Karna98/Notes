/**
 * resolve.ts
 *
 * Description:
 *    Resolving request received on main processs and returning response.
 *
 */

import { resolveRoute } from '../common/routes';
import { createMessage, IPCResponseObject } from '../common/util';
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
  requestData: AuthCredentialInterface
): [result: unknown, message: MessageInterface] => {
  let result, message: MessageInterface;

  switch (requestType[1]) {
    case `STATUS`:
      // Check if database exists
      if (database.checkIfDbExsts()) {
        // Update database if Schema is outdated.
        database.updateDatabase();

        // Get Users Count from Database.
        result = database.getUsersCount();
        message = createMessage('success', 'Request Executed Successfully.');
      } else {
        // Set result to 0 if no Database found.
        result = 0;
        message = createMessage('success', 'No Database Found.');
      }
      break;

    case `REGISTER`:
      // Intialize Database.
      database.init();

      result = database.createNewUser([
        cryptBcryptHash(requestData.username),
        Date.now(),
        cryptBcryptHash(requestData.password),
      ]);

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
          username: requestData.username,
          _id: registeredUsers._id,
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
 * This functions resolves all the request received from renderer on main process.
 *
 * @param request
 * @returns {IPCResponseObject} IPC Response Object to be sent to renderer process.
 */
const resolveRequest = (request: IPCRequestInterface) => {
  let data: unknown | object;
  let message: MessageInterface;

  // Resolve Request URI
  const requestSubURI = resolveRoute(request.URI);

  switch (requestSubURI[0]) {
    case `AUTH`:
      [data, message] = authRequest(
        requestSubURI,
        <AuthCredentialInterface>request.data
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

/**
 * Auth.ts
 *
 * Description:
 *    Resolves requests regarding Auth.
 *
 */

import { CONSTANT, createMessage } from '../../common';
import {
  cryptBcryptCompare,
  cryptBcryptHash,
  cryptoHash,
} from '../secure-util';
import database from './../sql';

// Constant Endpoint String.
const { ENDPOINT } = CONSTANT;

/**
 * Handles Authentication related requests.
 *
 * @param requestType
 * @param requestData
 * @param resolvedSubRequest
 */
const resolveAuth = (
  requestType: string[],
  requestData: AuthCredentialType,
  resolvedSubRequest: SubRequestResponseType
): void => {
  switch (requestType[1]) {
    case ENDPOINT.STATUS:
      // Check if database exists
      if (database.checkIfDbExsts()) {
        // Update database if Schema is outdated.
        database.updateDatabase();

        // Get Users Count from Database.
        resolvedSubRequest.data = database.getUsersCount();
      } else {
        // Set result to 0 if no Database found.
        resolvedSubRequest.data = 0;
      }

      resolvedSubRequest.message = createMessage('success');
      break;

    case ENDPOINT.REGISTER:
      // Intialize Database.
      !database.checkIfDbExsts() && database.init();

      const registerStatus = database.createNewUser(
        cryptBcryptHash(requestData.username),
        cryptBcryptHash(requestData.password)
      );

      resolvedSubRequest.message = registerStatus
        ? // Registration Successful.
          createMessage('success', 'User Registered Successfully.')
        : // Registration Failure.
          createMessage('server-error', 'User Registration failed.');
      break;

    case ENDPOINT.LOGIN:
      const registeredUsers = database.getUsers();

      const loginStatus =
        cryptBcryptCompare(requestData.username, registeredUsers.username) &&
        cryptBcryptCompare(requestData.password, registeredUsers.password);

      if (loginStatus)
        // Create Session Object.
        resolvedSubRequest.data = {
          _id: registeredUsers._id,
          username: requestData.username,
          password: cryptoHash(requestData.password),
          lPinStatus: registeredUsers.l_pin != null,
          sPinStatus: registeredUsers.s_pin != null,
          created_at: registeredUsers.created_at,
          last_logged_in: registeredUsers.last_logged_in,
        };

      resolvedSubRequest.message = loginStatus
        ? // Login Successful.
          createMessage('success')
        : // Login Failure.
          createMessage('client-error', 'Wrong Credentials.');
      break;

    default:
      break;
  }
};

export { resolveAuth };

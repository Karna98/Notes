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
 * @param requestURI
 * @param requestData
 * @param resolvedSubResponse
 */
const resolveAuth = (
  requestURI: string[],
  resolvedSubResponse: SubRequestResponseType,
  requestData: AuthRequestType
): void => {
  switch (requestURI[1]) {
    case ENDPOINT.STATUS:
      // Check if database exists
      if (database.checkIfDbExsts()) {
        // Update database if Schema is outdated.
        database.updateDatabase();

        // Get Users Count from Database.
        resolvedSubResponse.data = database.getUsersCount();
      } else {
        // Set result to 0 if no Database found.
        resolvedSubResponse.data = 0;
      }

      resolvedSubResponse.message = createMessage('success');
      break;

    case ENDPOINT.REGISTER:
      // Intialize Database.
      !database.checkIfDbExsts() && database.init();

      const registerStatus = database.createNewUser(
        cryptBcryptHash(requestData.username),
        cryptBcryptHash(requestData.password)
      );

      resolvedSubResponse.message = registerStatus
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
        resolvedSubResponse.data = {
          _id: registeredUsers._id,
          username: requestData.username,
          password: cryptoHash(requestData.password),
          lPinStatus: registeredUsers.l_pin != null,
          sPinStatus: registeredUsers.s_pin != null,
          created_at: registeredUsers.created_at,
          last_logged_in: registeredUsers.last_logged_in,
        };

      resolvedSubResponse.message = loginStatus
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

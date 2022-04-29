/**
 * AuthPin.ts
 *
 * Description:
 *    Resolves requests regarding Auth PIN.
 *
 */

import { createMessage } from '../../common';
import { bcryptHash, cryptBcryptCompare, cryptoHash } from '../secure-util';
import database from './../sql';

const authPin = (
  requestType: string[],
  requestData: SessionType,
  resolvedSubRequest: SubRequestResponseType
): void => {
  switch (requestType[1]) {
    // PIN Flow for Login.
    case `LOGIN`:
      const loginPin = requestData.password + requestData.l_pin;

      // Hashed login PIN
      const loginPinHashed = cryptoHash(loginPin);

      if (requestData.lPinStatus) {
        // [PIN VERIFY] If Login PIN is set.
        const registeredUsers = database.getUsers();

        const pinVerifyStatus = cryptBcryptCompare(
          loginPinHashed,
          registeredUsers.l_pin,
          true
        );

        if (pinVerifyStatus) {
          // If PIN matches.

          // Update last login time.
          database.updateUser(
            {
              last_logged_in: Date.now(),
            },
            requestData._id
          );

          resolvedSubRequest.message = createMessage(
            'success',
            'Login Successful.'
          );
        } else {
          // IF PIN mismatched.
          resolvedSubRequest.message = createMessage(
            'client-error',
            'Invalid PIN.'
          );
        }
      } else {
        // [PIN SETUP] If Login PIN is not set.

        // Update last login time and Login PIN.
        database.updateUser(
          {
            last_logged_in: Date.now(),
            l_pin: bcryptHash(loginPinHashed),
          },
          requestData._id
        );

        resolvedSubRequest.message = createMessage(
          'success',
          'Login Successful.'
        );
      }

      if (resolvedSubRequest.message.status == 200) {
        requestData.l_pin = loginPinHashed;
        requestData.lPinStatus = true;

        resolvedSubRequest.data = requestData;
      }

      break;

    default:
      // Invalid Sub Request.
      resolvedSubRequest.message = createMessage(
        'client-error',
        'Invalid Request'
      );
      break;
  }
};

export { authPin as resolveAuthPin };

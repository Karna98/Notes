/**
 * AuthPin.ts
 *
 * Description:
 *    Resolves requests regarding Auth PIN.
 *
 */

import { CONSTANT, createMessage } from '../../common';
import { bcryptHash, cryptBcryptCompare, cryptoHash } from '../secure-util';
import database from './../sql';

// Constant Endpoint String.
const { ENDPOINT } = CONSTANT;

/**
 * Handles PIN Authentication related requests.
 *
 * @param requestType
 * @param requestData
 * @param resolvedSubRequest
 */
const authPin = (
  requestType: string[],
  requestData: AuthPinRequestType,
  resolvedSubRequest: SubRequestResponseType
): void => {
  switch (requestType[1]) {
    // PIN Flow for Login.
    case ENDPOINT.LOGIN:
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

    case ENDPOINT.CREDENTIAL:
      // Hashed Credential PIN
      const credentialPinHashed = cryptoHash(
        requestData.l_pin + requestData.s_pin
      );

      switch (requestType[2]) {
        case ENDPOINT.SETUP:
          // Update Credential PIN.
          const updateStatus = database.updateUser(
            {
              s_pin: bcryptHash(credentialPinHashed),
            },
            requestData._id
          );

          if (updateStatus) {
            resolvedSubRequest.data = {
              s_pin: credentialPinHashed,
              sPinStatus: true,
            };

            resolvedSubRequest.message = createMessage(
              'success',
              'PIN set successfully.'
            );
          } else
            resolvedSubRequest.message = createMessage(
              'server-error',
              'Error while setting PIN.'
            );
          break;

        case ENDPOINT.VERIFY:
          let pinVerifyStatus = true;

          const registeredUsers = database.getUsers();

          pinVerifyStatus = cryptBcryptCompare(
            credentialPinHashed,
            registeredUsers.s_pin,
            true
          );

          if (pinVerifyStatus) {
            // If PIN matches.

            resolvedSubRequest.data = {
              s_pin: credentialPinHashed,
            };

            resolvedSubRequest.message = createMessage('success');
          } else {
            // IF PIN mismatched.
            resolvedSubRequest.message = createMessage(
              'client-error',
              'Invalid PIN.'
            );
          }
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }
};

export { authPin as resolveAuthPin };

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

// Constant String.
const { MSG_CODE } = CONSTANT;
const { ENDPOINT } = CONSTANT.IPC;

// Constant Message String.
const MSG_STR = {
  LOGIN_PIN_SUCCESS: `Login Successful.`,
  PIN_SETUP_FAILED: `Error while setting PIN !`,
  PIN_SETUP_SUCCESS: `PIN set successfully.`,
  PIN_VERIFY_FAILED: `Invalid PIN !`,
};

/**
 * Handles PIN Authentication related requests.
 *
 * @param requestURI
 * @param requestData
 * @param resolvedSubResponse
 */
const authPin = (
  requestURI: string[],
  resolvedSubResponse: SubRequestResponseType,
  requestData: AuthPinRequestType
): void => {
  switch (requestURI[1]) {
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

          resolvedSubResponse.message = createMessage(
            MSG_CODE.SUCCESS,
            MSG_STR.LOGIN_PIN_SUCCESS
          );
        } else {
          // IF PIN mismatched.
          resolvedSubResponse.message = createMessage(
            MSG_CODE.ERR_CLIENT,
            MSG_STR.PIN_VERIFY_FAILED
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

        resolvedSubResponse.message = createMessage(
          MSG_CODE.SUCCESS,
          MSG_STR.LOGIN_PIN_SUCCESS
        );
      }

      if (resolvedSubResponse.message.status == 200) {
        requestData.l_pin = loginPinHashed;
        requestData.lPinStatus = true;

        resolvedSubResponse.data = requestData;
      }

      break;

    case ENDPOINT.CREDENTIAL:
      // Hashed Credential PIN
      const credentialPinHashed = cryptoHash(
        requestData.l_pin + requestData.s_pin
      );

      switch (requestURI[2]) {
        case ENDPOINT.SETUP:
          // Update Credential PIN.
          const updateStatus = database.updateUser(
            {
              s_pin: bcryptHash(credentialPinHashed),
            },
            requestData._id
          );

          if (updateStatus) {
            resolvedSubResponse.data = {
              s_pin: credentialPinHashed,
              sPinStatus: true,
            };

            resolvedSubResponse.message = createMessage(
              MSG_CODE.SUCCESS,
              MSG_STR.PIN_SETUP_SUCCESS
            );
          } else
            resolvedSubResponse.message = createMessage(
              MSG_CODE.ERR_SERVER,
              MSG_STR.PIN_SETUP_FAILED
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

            resolvedSubResponse.data = {
              s_pin: credentialPinHashed,
            };

            resolvedSubResponse.message = createMessage(MSG_CODE.SUCCESS);
          } else {
            // IF PIN mismatched.
            resolvedSubResponse.message = createMessage(
              MSG_CODE.ERR_CLIENT,
              MSG_STR.PIN_VERIFY_FAILED
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

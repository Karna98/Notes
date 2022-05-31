/**
 * constants.ts
 *
 * Description:
 *    Constants declared.
 *
 */

// IPC Channel BUS
const CHANNEL_BUS = {
  TO: [`toMain`],
  FROM: [`fromMain`],
};

const ROUTE = {
  AUTH: {
    STATUS: `auth-status`,
    LOGIN: `auth-login`,
    REGISTER: `auth-register`,
  },
  AUTH_PIN: {
    LOGIN: 'auth_pin-login',
    CRED_SETUP: `auth_pin-credential-setup`,
    CRED_VERIFY: `auth_pin-credential-verify`,
  },
  CRED: {
    ADD: `credential-add`,
    UPDATE: `credential-update`,
  },
  NOTE: {
    ADD: `notes-add`,
    UPDATE: `notes-update`,
  },
  SPACE: {
    STATUS: `spaces-get`,
    ADD: `spaces-add`,
    GET: `spaces-get_space`,
  },
};

// Endpoint String.
const ENDPOINT = {
  ADD: `ADD`,
  AUTH: `AUTH`,
  AUTH_PIN: `AUTH_PIN`,
  CREDENTIAL: `CREDENTIAL`,
  GET: `GET`,
  GET_ALL: `GET_ALL`,
  GET_SPACE: `GET_SPACE`,
  LOGIN: `LOGIN`,
  NOTES: `NOTES`,
  REGISTER: `REGISTER`,
  SETUP: `SETUP`,
  SPACES: `SPACES`,
  STATUS: `STATUS`,
  UPDATE: `UPDATE`,
  VERIFY: `VERIFY`,
};

// Message/Error Code
const MSG_CODE = {
  // Intialized / In Progress
  PROGRESS: 0,
  // Success / Creation-Success
  SUCCESS: 200,
  // Bad-Request, Unauthorized
  ERR_CLIENT: 400,
  // Server-Error, Database-Error
  ERR_SERVER: 500,
};

export default { CHANNEL_BUS, ENDPOINT, MSG_CODE, ROUTE };

/**
 * constants.ts
 *
 * Description:
 *    Constants declared.
 *
 */

const ROUTE = {
  AUTH: {
    CRED: {
      SETUP: `auth-pin-credential-setup`,
      VERIFY: `auth-pin-credential-verify`,
    },
  },
  CRED: {
    ADD: `credential-add`,
    UPDATE: `credential-update`,
  },
};

// Endpoint String.
const ENDPOINT = {
  ADD: `ADD`,
  AUTH: `AUTH`,
  AUTH_PIN: `AUTH_PIN`,
  CREDENTIAL: `CREDENTIAL`,
  GET: `GET`,
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

export default { ROUTE, ENDPOINT };

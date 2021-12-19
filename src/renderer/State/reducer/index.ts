/**
 * index.ts
 *
 * Description:
 *    Index File for all Reducers.
 *
 */

import message, { clearMessageState, updateMessageState } from './message';
import response, { updateResponseState } from './response';
import session, { clearSessionState, updateSessionState } from './session';

export {
  updateMessageState,
  clearMessageState,
  updateResponseState,
  updateSessionState,
  clearSessionState,
};

export default { message, response, session };

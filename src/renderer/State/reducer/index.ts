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
import spaces, { updateSpacesState } from './spaces';

export {
  updateMessageState,
  clearMessageState,
  updateResponseState,
  updateSessionState,
  clearSessionState,
  updateSpacesState,
};

export default { message, response, session, spaces };

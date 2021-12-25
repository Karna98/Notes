/**
 * index.ts
 *
 * Description:
 *    Index File for all Reducers.
 *
 */

import message, { clearMessageState, updateMessageState } from './message';
import response, { clearResponseState, updateResponseState } from './response';
import session, { clearSessionState, updateSessionState } from './session';
import spaces, { clearSpacesState, updateSpacesState } from './spaces';

// Exports to update State.
export {
  clearMessageState,
  updateMessageState,
  clearResponseState,
  updateResponseState,
  clearSessionState,
  updateSessionState,
  clearSpacesState,
  updateSpacesState,
};

// Default export to view State.
export default { message, response, session, spaces };

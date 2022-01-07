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
import space, {
  clearSpaceState,
  updateSpaceState,
  updateNoteState,
} from './space';
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
  clearSpaceState,
  updateSpaceState,
  updateNoteState,
};

// Default export to view State.
export default { message, response, session, spaces, space };

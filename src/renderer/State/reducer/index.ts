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
  addNoteState,
  clearSpaceState,
  updateNoteState,
  updateSpaceState,
} from './space';
import spaces, {
  addSpacesState,
  clearSpacesState,
  updateSpacesState,
} from './spaces';

// Exports to update State.
export {
  addNoteState,
  addSpacesState,
  clearMessageState,
  clearResponseState,
  clearSessionState,
  clearSpaceState,
  clearSpacesState,
  updateMessageState,
  updateNoteState,
  updateResponseState,
  updateSessionState,
  updateSpaceState,
  updateSpacesState,
};

// Default export to view State.
export default { message, response, session, spaces, space };

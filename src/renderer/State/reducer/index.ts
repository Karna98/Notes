/**
 * index.ts
 *
 * Description:
 *    Index File for all Reducers.
 *
 */

import message, { clearMessageState, setMessageState } from './message';
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
  clearSessionState,
  clearSpaceState,
  clearSpacesState,
  setMessageState,
  updateNoteState,
  updateSessionState,
  updateSpaceState,
  updateSpacesState,
};

// Default export to view State.
export default { message, session, spaces, space };

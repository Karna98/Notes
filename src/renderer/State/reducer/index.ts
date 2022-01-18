/**
 * index.ts
 *
 * Description:
 *    Index File for all Reducers.
 *
 */

import message, { clearMessageState, setMessageState } from './message';
import session, { clearSessionState, setSessionState } from './session';
import space, {
  addNoteState,
  clearSpaceState,
  updateNoteState,
  updateSpaceState,
} from './space';
import spaces, {
  addSpaceState,
  clearSpacesState,
  setSpacesState,
} from './spaces';

// Exports to update State.
export {
  addNoteState,
  addSpaceState,
  clearMessageState,
  clearSessionState,
  clearSpaceState,
  clearSpacesState,
  setMessageState,
  updateNoteState,
  setSessionState,
  setSpacesState,
  updateSpaceState,
};

// Default export to view State.
export default { message, session, spaces, space };

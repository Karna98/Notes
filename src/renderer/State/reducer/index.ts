/**
 * index.ts
 *
 * Description:
 *    Index File for all Reducers.
 *
 */

import message, { clearMessageState, setMessageState } from './message';
import session, { clearSessionState, setSessionState } from './session';
import spaces, {
  addNoteState,
  addSpaceState,
  clearSpacesState,
  setCurrentSpaceState,
  setSpacesState,
  updateNoteState,
} from './spaces';

// Exports to update State.
export {
  addNoteState,
  addSpaceState,
  clearMessageState,
  clearSessionState,
  clearSpacesState,
  setMessageState,
  setCurrentSpaceState,
  setSessionState,
  setSpacesState,
  updateNoteState,
};

// Default export to view State.
export default { message, session, spaces };

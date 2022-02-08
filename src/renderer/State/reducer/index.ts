/**
 * index.ts
 *
 * Description:
 *    Index File for all Reducers.
 *
 */

import message from './message';
import session from './session';
import spaces from './spaces';

export { clearMessageState, setMessageState } from './message';
export { clearSessionState, setSessionState } from './session';
export {
  addCredentialState,
  addNoteState,
  addSpaceState,
  clearSpacesState,
  setCurrentSpaceState,
  setSpacesState,
  updateNoteState,
} from './spaces';

// Export reducers as default.
export default { message, session, spaces };

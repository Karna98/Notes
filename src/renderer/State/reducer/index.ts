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
import volatile from './volatile';

export { clearMessageState, setMessageState } from './message';
export {
  clearSessionState,
  setSessionState,
  updateSessionState,
} from './session';
export {
  addCredentialState,
  addNoteState,
  addSpaceState,
  clearSpacesState,
  setCurrentSpaceState,
  setSpacesState,
  updateCredentialState,
  updateNoteState,
} from './spaces';
export { clearVolatileState, setVolatileState } from './volatile';

// Export reducers as default.
export default { message, session, spaces, volatile };

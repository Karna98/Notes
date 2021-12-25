/**
 * session.ts
 *
 * Description:
 *    State for Session.
 *
 */

import { browserStorage } from '../../util';

const SET_SESSION = 'set-session';
const CLEAR_SESSION = 'clear-session';

// Update Session State.
export const updateSessionState = (payload: SessionStoreType) => ({
  type: SET_SESSION,
  payload,
});

// Clear Session State.
export const clearSessionState = () => ({
  type: CLEAR_SESSION,
});

// Initialize Session State.
const initialState: SessionStoreType | null =
  browserStorage.getValue('session');

export default (
  state = initialState,
  action: { type: string; payload: SessionStoreType }
) => {
  switch (action.type) {
    case SET_SESSION:
      browserStorage.setValue('session', action.payload);
      return action.payload;
    case CLEAR_SESSION:
      browserStorage.removeItem('session');
      return null;
    default:
      return state;
  }
};

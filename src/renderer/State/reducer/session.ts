/**
 * session.ts
 *
 * Description:
 *    State for Session.
 *
 */

import { browserStorage } from '../../util';

const SET_SESSION = 'set-session';

// Update Session State.
export const updateSessionState = (sessionObject: SessionStoreType) => ({
  type: SET_SESSION,
  payload: sessionObject,
});

// Intialize Session State.
const initialState: SessionStoreType | null =
  browserStorage.getValue('session');

export default (
  state = initialState,
  action: { type: string; payload: SessionStoreType }
) => {
  switch (action.type) {
    case SET_SESSION:
      if (process.env.NODE_ENV === 'development')
        browserStorage.setValue('session', action.payload);
      return action.payload;
    default:
      return state;
  }
};

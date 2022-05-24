/**
 * session.ts
 *
 * Description:
 *    State for Session.
 *
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { browserStorage } from '../../util';

// Initialize Session State.
const initialState: SessionType | null = browserStorage.getValue(
  `session`,
  `SESSION`
);

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    // Set Session.
    setSessionState: (_state, action: PayloadAction<SessionType>) => {
      // Save in browser's session storage.
      browserStorage.setValue(`session`, `SESSION`, action.payload);
      return action.payload;
    },
    // Update Session.
    updateSessionState: (state, action: PayloadAction<object>) => {
      const updatedSession = {
        ...state,
        ...action.payload,
      };

      // Save in browser's session storage.
      browserStorage.setValue(`session`, `SESSION`, updatedSession);
      Object.assign(state, updatedSession);
    },
    // Clear Session.
    clearSessionState: () => {
      // Remove from browser's session storage.
      browserStorage.removeItem(`session`, `SESSION`);
      return null;
    },
  },
});

export const { setSessionState, clearSessionState, updateSessionState } =
  sessionSlice.actions;

export default sessionSlice.reducer;

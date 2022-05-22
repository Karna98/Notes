/**
 * volatile.ts
 *
 * Description:
 *    State for Volatile - used for temporary storage of data..
 *
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initialize Volatile State.
const initialState: CredentialDataType = {
  _id: -1,
  credential: Object.create(null),
};

const volatileSlice = createSlice({
  name: 'volatile',
  initialState,
  reducers: {
    // Set Volatile Storage.
    setVolatileState: (state, action: PayloadAction<CredentialDataType>) => {
      Object.assign(state, action.payload);
    },
    // Clear Volatile Storage.
    clearVolatileState: () => {
      return initialState;
    },
  },
});

export const { setVolatileState, clearVolatileState } = volatileSlice.actions;

export default volatileSlice.reducer;

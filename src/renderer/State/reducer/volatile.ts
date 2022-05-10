/**
 * volatile.ts
 *
 * Description:
 *    State for Valatile - used for temporary storage of data..
 *
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initialize Volatile State.
const initialState: CredentialStoreType = {
  _id: -1,
  updated_at: -1,
  credential: Object.create(null),
};

const volatileSlice = createSlice({
  name: 'volatile',
  initialState,
  reducers: {
    // Set Volatile Storage.
    setVolatileState: (state, action: PayloadAction<CredentialStoreType>) => {
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

/**
 * message.ts
 *
 * Description:
 *    State for Message to be displayed.
 *
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initialize Message State.
const initialState: MessageInterface = {
  status: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    // Set Message.
    setMessageState: (state, action: PayloadAction<MessageInterface>) => {
      Object.assign(state, action.payload);
    },
    // Clear Message.
    clearMessageState: () => {
      return initialState;
    },
  },
});

export const { setMessageState, clearMessageState } = messageSlice.actions;

export default messageSlice.reducer;

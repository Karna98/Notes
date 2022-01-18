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
    setMessageState: (state, action: PayloadAction<MessageInterface>) => {
      // Set Message.
      Object.assign(state, action.payload);
    },
    clearMessageState: () => {
      // Clear Message.
      return initialState;
    },
  },
});

export const { setMessageState, clearMessageState } = messageSlice.actions;

export default messageSlice.reducer;

/**
 * message.ts
 *
 * Description:
 *    State for Message to be displayed.
 *
 */

const SET_MESSAGE = 'set-message';
const CLEAR_MESSAGE = 'clear-message';

// Update Message State.
export const updateMessageState = (status: number, message: string) => ({
  type: SET_MESSAGE,
  payload: { status, message },
});

// Clear Message State.
export const clearMessageState = () => ({
  type: CLEAR_MESSAGE,
});

// Initialize Response State.
const initialState: MessageInterface | null = null;

export default (
  state = initialState,
  action: { type: string; payload: MessageInterface }
) => {
  switch (action.type) {
    case SET_MESSAGE:
      return action.payload;
    case CLEAR_MESSAGE:
      return null;
    default:
      return state;
  }
};

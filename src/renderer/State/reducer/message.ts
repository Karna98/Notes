/**
 * message.ts
 *
 * Description:
 *    State for Message to be displayed.
 *
 */

const MESSAGE = 'message';

// Update Response State.
export const updateMessageState = (status: number, message: string) => ({
  type: MESSAGE,
  payload: { status, message },
});

// Intialize Response State.
const initialState = {
  status: undefined,
  message: undefined,
};

export default (
  state = initialState,
  action: { type: string; payload: MessageInterface }
) => {
  switch (action.type) {
    case MESSAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

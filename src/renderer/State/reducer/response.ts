/**
 * response.ts
 *
 * Description:
 *    State for Response received from main process.
 *
 */

const SET_RESPONSE = 'set-response';
const CLEAR_RESPONSE = 'clear-response';

// Update Response State.
export const updateResponseState = (payload: IPCResponseInterface) => ({
  type: SET_RESPONSE,
  payload,
});

// Clear Response State.
export const clearResponseState = () => ({
  type: CLEAR_RESPONSE,
});

// Initialize Response State.
const initialState: IPCResponseInterface | null = null;

export default (
  state = initialState,
  action: { type: string; payload: IPCResponseInterface }
) => {
  switch (action.type) {
    case SET_RESPONSE:
      return action.payload;
    case CLEAR_RESPONSE:
      return null;
    default:
      return state;
  }
};

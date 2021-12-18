/**
 * response.ts
 *
 * Description:
 *    State for Response received from main process.
 *
 */

const SET_RESPONSE = 'set-response';

// Update Response State.
export const updateResponseState = (response: IPCResponseInterface) => ({
  type: SET_RESPONSE,
  payload: response,
});

// Intialize Response State.
const initialState: IPCResponseInterface | null = null;

export default (
  state = initialState,
  action: { type: string; payload: IPCResponseInterface }
) => {
  switch (action.type) {
    case SET_RESPONSE:
      return action.payload;
    default:
      return state;
  }
};

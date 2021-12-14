/**
 * response.ts
 *
 * Description:
 *    State for Response received from main process.
 *
 */

const RESPONSE_OBJECT = 'response';

// Update Response State.
export const updateResponseState = (responseObject: IPCResponseInterface) => ({
  type: RESPONSE_OBJECT,
  payload: responseObject,
});

// Intialize Response State.
const initialState: IPCResponseInterface | null = null;

export default (
  state = initialState,
  action: { type: string; payload: IPCResponseInterface }
) => {
  switch (action.type) {
    case RESPONSE_OBJECT:
      return action.payload;
    default:
      return state;
  }
};

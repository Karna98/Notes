/**
 * space.ts
 *
 * Description:
 *    State for Space.
 *
 */

const SET_SPACE = 'set-space';
const CLEAR_SPACE = 'clear-space';

// Update Space State.
export const updateSpaceState = (payload: SpaceInterface) => ({
  type: SET_SPACE,
  payload,
});

// Clear Space State.
export const clearSpaceState = () => ({
  type: CLEAR_SPACE,
});

// Initialize Space State.
const initialState: SpaceInterface | null = null;

export default (
  state = initialState,
  action: { type: string; payload: SpaceInterface }
) => {
  switch (action.type) {
    case SET_SPACE:
      return action.payload;
    case CLEAR_SPACE:
      return null;
    default:
      return state;
  }
};

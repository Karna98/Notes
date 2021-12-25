/**
 * spaces.ts
 *
 * Description:
 *    State for Spaces.
 *
 */

const SET_SPACES = 'set-spaces';
const CLEAR_SPACES = 'clear-spaces';

// Update Spaces State.
export const updateSpacesState = (payload: SpacesType) => ({
  type: SET_SPACES,
  payload,
});

// Clear Spaces State.
export const clearSpacesState = () => ({
  type: CLEAR_SPACES,
});

// Initialize Spaces State.
const initialState: SpacesType | null = null;

export default (
  state = initialState,
  action: { type: string; payload: SpacesType }
) => {
  switch (action.type) {
    case SET_SPACES:
      return action.payload;
    case CLEAR_SPACES:
      return null;
    default:
      return state;
  }
};

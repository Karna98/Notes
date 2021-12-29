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
export const updateSpacesState = (payload: SpacesInterface) => ({
  type: SET_SPACES,
  payload,
});

// Clear Spaces State.
export const clearSpacesState = () => ({
  type: CLEAR_SPACES,
});

// Initialize Spaces State.
const initialState: SpacesInterface | null = null;

export default (
  state = initialState,
  action: { type: string; payload: SpacesInterface }
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

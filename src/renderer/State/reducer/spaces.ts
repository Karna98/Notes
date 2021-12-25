/**
 * spaces.ts
 *
 * Description:
 *    State for Spaces.
 *
 */

const SET_SPACES = 'set-spaces';

// Update Spaces State.
export const updateSpacesState = (payload: SpacesType) => ({
  type: SET_SPACES,
  payload,
});

// Initialize Session State.
const initialState: SpacesType | null = null;

export default (
  state = initialState,
  action: { type: string; payload: SpacesType }
) => {
  switch (action.type) {
    case SET_SPACES:
      return action.payload;
    default:
      return state;
  }
};

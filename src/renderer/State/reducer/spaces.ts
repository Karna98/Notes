/**
 * spaces.ts
 *
 * Description:
 *    State for Spaces.
 *
 */

const SET_SPACES = 'set-spaces';

// Update Spaces State.
export const updateSpacesState = (spaces: Record<number, SpacesType>) => ({
  type: SET_SPACES,
  payload: spaces,
});

// Initialize Session State.
const initialState: Record<number, SpacesType> | null = null;

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

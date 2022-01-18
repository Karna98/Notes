/**
 * spaces.ts
 *
 * Description:
 *    State for Spaces.
 *
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { browserStorage } from '../../util';

// Initialize Spaces State.
const initialState: SpacesInterface | null = browserStorage.getValue(
  `session`,
  `SPACES`
);

const spacesSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    // Set Spaces.
    setSpacesState: (_state, action: PayloadAction<SpacesInterface>) => {
      // Save in browser's session storage.
      browserStorage.setValue(`session`, `SPACES`, action.payload);
      return action.payload;
    },
    // Add new Space.
    addSpaceState: (state, action: PayloadAction<SpacesTableInterface>) => {
      if (state != null) {
        const updatedSpacesList: SpacesTableInterface[] = [
          ...state.list,
          action.payload,
        ];

        state.list = updatedSpacesList;

        // Save in browser's session storage.
        browserStorage.setValue(`session`, `SPACES`, {
          ...state,
          list: updatedSpacesList,
        });
      }
    },
    // Clear Spaces.
    clearSpacesState: () => {
      // Remove from browser's session storage.
      browserStorage.removeItem(`session`, `SPACES`);
      return initialState;
    },
  },
});

export const { addSpaceState, clearSpacesState, setSpacesState } =
  spacesSlice.actions;

export default spacesSlice.reducer;

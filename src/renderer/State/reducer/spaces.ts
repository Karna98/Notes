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

const setBrowserStorage = (object: SpacesInterface) => {
  // Save in browser's session storage.
  browserStorage.setValue(`session`, `SPACES`, object);
};

const clearBrowserStorage = () => {
  // Remove from browser's session storage.
  browserStorage.removeItem(`session`, `SPACES`);
};

const spacesSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    // Set Spaces.
    setSpacesState: (_state, action: PayloadAction<SpacesInterface>) => {
      setBrowserStorage(action.payload);
      return { ...action.payload };
    },
    // Add new Space.
    addSpaceState: (state, action: PayloadAction<SpacesTableInterface>) => {
      if (state != null) {
        const updatedSpacesList: SpacesTableInterface[] = [
          ...state.list,
          action.payload,
        ];

        setBrowserStorage({
          ...state,
          list: updatedSpacesList,
        });

        state.list = updatedSpacesList;
      }
    },
    // Clear Spaces.
    clearSpacesState: () => {
      clearBrowserStorage();
      return initialState;
    },
    // Set Spaces.
    setCurrentSpaceState: (state, action: PayloadAction<SpaceInterface>) => {
      if (state != null) {
        const currentSpace: SpaceInterface = action.payload;

        setBrowserStorage({
          ...state,
          currentSpace,
        });

        state.currentSpace = currentSpace;
      }
    },
    // Add new Note.
    addNoteState: (state, action: PayloadAction<NotesTableInterface>) => {
      if (state != null && state.currentSpace !== undefined) {
        const updatedNotesList: NotesTableInterface[] = [
          action.payload,
          ...state.currentSpace.notes,
        ];

        setBrowserStorage({
          ...state,
          currentSpace: {
            ...state.currentSpace,
            notes: updatedNotesList,
          },
        });

        state.currentSpace.notes = updatedNotesList;
      }
    },
    // Update Note.
    updateNoteState: (state, action: PayloadAction<NotesTableInterface>) => {
      if (state != null && state.currentSpace !== undefined) {
        const indexOfNote = state.currentSpace.notes.findIndex(
          (note: NotesTableInterface) => note._id == action.payload._id
        );

        if (indexOfNote != -1) {
          const currentSpaceNotes = state.currentSpace.notes;

          currentSpaceNotes[indexOfNote] = action.payload;

          setBrowserStorage({
            ...state,
            currentSpace: {
              ...state.currentSpace,
              notes: currentSpaceNotes,
            },
          });

          state.currentSpace.notes[indexOfNote] = action.payload;
        }
      }
    },
  },
});

export const {
  addNoteState,
  addSpaceState,
  clearSpacesState,
  setSpacesState,
  setCurrentSpaceState,
  updateNoteState,
} = spacesSlice.actions;

export default spacesSlice.reducer;

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
      return null;
    },

    // Set Spaces.
    setCurrentSpaceState: (state, action: PayloadAction<SpaceInterface>) => {
      if (state != null) {
        const updatedCurrentSpaceState = {
          ...state,
          currentSpace: action.payload,
        };

        setBrowserStorage(updatedCurrentSpaceState);

        Object.assign(state, updatedCurrentSpaceState);
      }
    },

    // Add new Note.
    addNoteState: (state, action: PayloadAction<NotesTableInterface>) => {
      const { space_id, ...newNote } = action.payload;

      if (
        state != null &&
        state.currentSpace !== undefined &&
        state.currentSpace.space_id == space_id
      ) {
        const updatedNotesList: NoteStoreType[] = [
          newNote,
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
    updateNoteState: (state, action: PayloadAction<NoteStoreType>) => {
      if (state != null && state.currentSpace !== undefined) {
        const indexOfNote = state.currentSpace.notes.findIndex(
          (note: NoteStoreType) => note._id == action.payload._id
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

    // Add new Credential.
    addCredentialState: (state, action: PayloadAction<CredentialDataType>) => {
      const { space_id, ...newCredential } = action.payload;

      if (
        state != null &&
        state.currentSpace !== undefined &&
        state.currentSpace.space_id == space_id
      ) {
        const updatedCredentialsList: CredentialDataType[] = [
          newCredential,
          ...state.currentSpace.credentials,
        ];

        setBrowserStorage({
          ...state,
          currentSpace: {
            ...state.currentSpace,
            credentials: updatedCredentialsList,
          },
        });

        Object.assign(state?.currentSpace?.credentials, updatedCredentialsList);
      }
    },

    // Update Credential.
    updateCredentialState: (
      state,
      action: PayloadAction<CredentialDataType>
    ) => {
      if (state != null && state.currentSpace !== undefined) {
        const indexOfCredential = state.currentSpace.credentials.findIndex(
          (credential: CredentialDataType) =>
            credential._id == action.payload._id
        );

        if (indexOfCredential != -1) {
          const currentSpaceCredential: CredentialDataType[] =
            state.currentSpace.credentials;

          currentSpaceCredential[indexOfCredential] = action.payload;

          setBrowserStorage({
            ...state,
            currentSpace: {
              ...state.currentSpace,
              credentials: currentSpaceCredential,
            },
          });

          Object.assign(state.currentSpace.credentials, currentSpaceCredential);
        }
      }
    },
  },
});

export const {
  addCredentialState,
  addNoteState,
  addSpaceState,
  clearSpacesState,
  setSpacesState,
  setCurrentSpaceState,
  updateCredentialState,
  updateNoteState,
} = spacesSlice.actions;

export default spacesSlice.reducer;

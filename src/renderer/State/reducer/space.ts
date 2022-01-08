/**
 * space.ts
 *
 * Description:
 *    State for Space.
 *
 */

const SET_SPACE = 'set-space';
const CLEAR_SPACE = 'clear-space';
const UPDATE_SPACE = 'update-space';

// Update Space State.
export const updateSpaceState = (payload: SpaceInterface) => ({
  type: SET_SPACE,
  payload,
});

// Clear Space State.
export const clearSpaceState = () => ({
  type: CLEAR_SPACE,
});

// Add Note State.
export const addNoteState = (payload: NotesTableInterface) => ({
  type: UPDATE_SPACE,
  subType: 'ADD',
  payload,
});

// Update Note State.
export const updateNoteState = (
  payload: OptionalExceptFor<NotesTableInterface, '_id' | 'note' | 'updated_at'>
) => ({
  type: UPDATE_SPACE,
  subType: 'UPDATE',
  payload,
});

// Initialize Space State.
const initialState: SpaceInterface & { updated_at: number } = {
  space_id: -1,
  notes: [],
  updated_at: -1,
};

export default (
  state = initialState,
  action: {
    type: string;
    payload: SpaceInterface | NotesTableInterface;
    subType?: 'ADD' | 'UPDATE';
  }
) => {
  switch (action.type) {
    case SET_SPACE:
      return { ...action.payload, updated_at: Date.now() };
    case CLEAR_SPACE:
      return null;
    case UPDATE_SPACE:
      switch (action.subType) {
        case 'ADD':
          return {
            ...state,
            notes: [action.payload, ...state.notes],
            updated_at: Date.now(),
          };
        case 'UPDATE':
          const actionPaylaod = <NotesTableInterface>action.payload;

          const indexOfNote = state.notes.findIndex(
            (note: NotesTableInterface) => note._id == actionPaylaod._id
          );

          const updatedNotes = [...state.notes];

          updatedNotes[indexOfNote] = {
            ...updatedNotes[indexOfNote],
            ...actionPaylaod,
          };

          return {
            ...state,
            notes: updatedNotes,
            updated_at: Date.now(),
          };

        default:
          return state;
      }

    default:
      return state;
  }
};

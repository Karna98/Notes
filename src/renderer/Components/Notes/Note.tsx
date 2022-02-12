/**
 * Note.tsx
 *
 * Description:
 *    Note Component.
 *
 */

import { IPCRequestObject } from 'common';
import { useParams } from 'react-router-dom';
import { Form } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';
import { sendToIpcMain } from 'renderer/util';

const Note = () => {
  // Infer note_id passed in URL.
  const { note_id } = useParams();

  // Get space value stored in Redux Store.
  const notesListState = useAppSelector(
    (state) => state.spaces?.currentSpace?.notes
  );

  const currentNote = notesListState?.filter(
    ({ _id }: NoteStoreType) => _id == Number(note_id)
  )[0];

  /**
   * Update note.
   *
   * @param formData Form fields value.
   */
  const formSubmitAction = (formData?: Record<string, unknown>) => {
    sendToIpcMain(IPCRequestObject(`notes-update`, formData));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center notes">
      <div className="note-form-update-section note-card">
        <Form
          id="note-form-update"
          submitAction={formSubmitAction}
          formValues={currentNote}
        />
      </div>
    </div>
  );
};

export default Note;

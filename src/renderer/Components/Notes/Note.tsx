/**
 * Note.tsx
 *
 * Description:
 *    Note Component.
 *
 */

import { IPCRequestObject } from 'common';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';
import { sendToIpcMain } from 'renderer/util';

const Note = () => {
  const navigate = useNavigate();

  // Infer note_id passed in URL.
  const { note_id } = useParams();

  // Get space value stored in Redux Store.
  const notesListState = useAppSelector(
    (state) => state.spaces?.currentSpace?.notes
  );

  const currentNote = notesListState?.filter(
    ({ _id }: NoteStoreType) => _id == Number(note_id)
  )[0];

  const [note, setNote] = useState({
    note: currentNote?.note,
    updated_at: Date.now(),
  });

  const onClose = () => {
    navigate(-1);
  };

  // Form Elements.
  const formElements: FormElementsInterface = {
    input: [
      {
        id: `note`,
        name: `note`,
        type: 'text',
        required: true,
        value: note.note,
      },
    ],
    button: [
      {
        id: `note-update`,
        label: 'Update',
      },
    ],
  };

  /**
   * Update note.
   *
   * @param formData Form fields value.
   */
  const formSubmitAction = (formData: Record<string, unknown>) => {
    const updatedNote = {
      note: formData.note as string,
      updated_at: Date.now(),
    };

    if (currentNote?.note !== formData.note) {
      setNote(updatedNote);
      sendToIpcMain(
        IPCRequestObject(`notes-update`, {
          _id: currentNote?._id,
          ...updatedNote,
        })
      );
    }
  };

  return (
    <>
      <div>
        <p>
          <b>Note-ID:</b> {currentNote?._id}
        </p>
        <p>
          <b>Last Updated at: </b>
          {currentNote &&
            new Date(currentNote.updated_at).toLocaleString('en-IN', {
              hourCycle: 'h23',
            })}
        </p>
        <Form
          id="form-note-update"
          method="POST"
          elements={formElements}
          submitAction={formSubmitAction}
        />
      </div>

      <div>
        <Button id="close-note" label="Close Note" onClick={onClose} />
      </div>
    </>
  );
};

export default Note;

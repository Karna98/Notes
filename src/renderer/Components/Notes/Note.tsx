/**
 * Note.tsx
 *
 * Description:
 *    Note Component.
 *
 */

import React, { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IPCRequestObject } from '../../../common/util';
import { sendToIpcMain } from '../../util';
import Button from '../Elements/Button';
import Form from '../Elements/Form';

const Note = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // Infer note_id passed in URL.
  const { note_id } = useParams();

  // Get space value stored in Redux Store.
  const spaceState = useSelector(
    (state: RootStateOrAny) => state.spaces.currentSpace
  );

  const currentNote: NotesTableInterface = spaceState?.notes.filter(
    ({ _id }: NotesTableInterface) => _id == Number(note_id)
  )[0];

  const [note, setNote] = useState({
    note: currentNote.note,
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
   * Adds new space.
   *
   * @param formData Form fields value.
   */
  const formSubmitAction = (formData: Record<string, unknown>) => {
    const updatedNote = {
      note: formData.note as string,
      updated_at: Date.now(),
    };

    if (currentNote.note !== formData.note) {
      setNote(updatedNote);
      sendToIpcMain(
        IPCRequestObject(`notes-update`, {
          _id: currentNote._id,
          ...updatedNote,
        })
      );
    }
  };

  return (
    <>
      <div>
        <p>
          <b>Note-ID:</b> {currentNote._id}
        </p>
        <p>
          <b>Last Updated at: </b>
          {new Date(currentNote.updated_at).toLocaleString('en-IN', {
            hour12: false,
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

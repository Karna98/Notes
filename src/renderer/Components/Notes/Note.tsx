/**
 * Note.tsx
 *
 * Description:
 *    Note Component.
 *
 */

import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IPCRequestObject } from '../../../common/util';
import { updateSpaceState } from '../../State/reducer';
import { sendToIpcMain } from '../../util';
import Button from '../Elements/Button';
import Form from '../Elements/Form';

const Note = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Infer note_id passed in URL.
  const { note_id } = useParams();

  // Get response value stored in Redux Store.
  const responseState = useSelector((state: RootStateOrAny) => state.response);
  // Get space value stored in Redux Store.
  const spaceState = useSelector((state: RootStateOrAny) => state.space);

  const note = spaceState?.notes.filter(
    ({ _id }: NotesTableInterface) => _id == Number(note_id)
  )[0];

  const onClose = () => {
    navigate(-1);
  };

  // Form Elements.
  const formElements: FormElementsInterface = {
    input: [
      {
        id: `note-${note._id}`,
        name: `note`,
        type: 'text',
        required: true,
        value: note.note,
      },
    ],
    button: [
      {
        id: `note-update-${note._id}`,
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
    sendToIpcMain(
      IPCRequestObject(`notes-update`, {
        _id: note._id,
        note: formData.note,
        space_id: note.space_id,
        updated_at: Date.now(),
      })
    );
  };

  const resolveResponse = () => {
    switch (responseState.URI) {
      case 'notes-update':
        if (
          responseState.status == 200 &&
          spaceState?.updated_at < responseState.timestamp
        ) {
          dispatch(
            updateSpaceState({
              space_id: note.space_id,
              notes: responseState.data,
            })
          );
        }
        break;
    }
  };

  useEffect(() => {
    resolveResponse();
  }, [responseState]);

  return (
    <>
      <div>
        <p>
          <b>Note-ID:</b> {note._id}
        </p>
        <p>
          <b>Last Updated at: </b>
          {new Date(note.updated_at).toLocaleString('en-IN', { hour12: false })}
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

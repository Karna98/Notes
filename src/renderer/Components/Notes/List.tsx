/**
 * List.tsx
 *
 * Description:
 *    List all the Notes.
 *
 */

import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IPCRequestObject } from '../../../common/util';
import { useAppSelector } from '../../Hooks';
import { sendToIpcMain } from '../../util';
import Form from '../Elements/Form';

const List = () => {
  const location = useLocation();

  // Get Current Space ID
  const { space_id } = useParams();

  // Get space value stored in Redux Store.
  const currentSpaceState = useAppSelector(
    (state) => state.spaces?.currentSpace
  );

  // Form Elements.
  const formElements: FormElementsInterface = {
    input: [
      {
        id: 'add-note',
        name: 'note',
        type: 'text',
        placeholder: `Let's Note it down ..`,
        required: false,
        value: '',
      },
    ],
    button: [
      {
        id: 'add-note',
        label: 'Save',
      },
    ],
  };

  const formSubmitAction = (formData: Record<string, unknown>) => {
    // Check if note is empty.
    const isNoteEmpty = (formData.note as string).trim().length == 0;

    !isNoteEmpty &&
      sendToIpcMain(
        IPCRequestObject(`notes-add`, {
          ...formData,
          space_id: Number(space_id),
        })
      );
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="note-add">
        <Form
          id="add-note"
          method="POST"
          elements={formElements}
          submitAction={formSubmitAction}
          reset={true}
        />
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-evenly">
        {currentSpaceState?.notes.map((note: NotesTableInterface) => (
          <Link
            key={note._id}
            to={`${location.pathname}/${note._id}`}
            className="note-card"
          >
            <div>{note.note}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;

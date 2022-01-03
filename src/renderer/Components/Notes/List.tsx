/**
 * List.tsx
 *
 * Description:
 *    List all the Notes.
 *
 */

import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IPCRequestObject } from '../../../common/util';
import { updateMessageState, updateSpaceState } from '../../State/reducer';
import { sendToIpcMain } from '../../util';
import Form from '../Elements/Form';

const List = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  // Get Current Space ID
  const { space_id } = useParams();

  // Get response value stored in Redux Store.
  const responseState = useSelector((state: RootStateOrAny) => state.response);
  // Get space value stored in Redux Store.
  const spaceState = useSelector((state: RootStateOrAny) => state.space);

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
    sendToIpcMain(
      IPCRequestObject(`notes-add`, { ...formData, space_id: Number(space_id) })
    );
  };

  /**
   * Displays Message.
   *
   * @param status Message Status.
   * @param message Message.
   */
  const dispatchMessage = (status: number, message: string) => {
    dispatch(updateMessageState(status, message));
  };

  /**
   * Resolves Response received.
   */
  const resolveResponse = () => {
    switch (responseState.URI) {
      case 'notes-get':
        if (responseState.status == 200)
          dispatch(
            updateSpaceState({
              space_id: Number(space_id),
              notes: responseState.data,
            })
          );
        break;

      case 'notes-add':
        if (
          responseState.status == 200 &&
          spaceState?.notes.length != responseState.data.length
        ) {
          dispatch(
            updateSpaceState({
              space_id: Number(space_id),
              notes: responseState.data,
            })
          );
        } else if (responseState.status == 500) {
          // If Space was not added successfully.
          dispatchMessage(responseState.status, responseState.message);
        }
        break;
    }
  };

  useEffect(() => {
    resolveResponse();
  }, [responseState]);

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
        {spaceState?.notes.map((note: NotesTableInterface) => (
          <Link key={note._id} to={`${location.pathname}/${note._id}`}>
            <div className="note-card">{note.note}</div>
            <sub>Updated at {note.updated_at}</sub>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;

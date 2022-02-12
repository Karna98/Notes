/**
 * List.tsx
 *
 * Description:
 *    List all the Notes.
 *
 */

import { IPCRequestObject } from 'common';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Form } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';
import { sendToIpcMain } from 'renderer/util';
import { TextArea } from '../Elements';

const List = () => {
  const location = useLocation();

  // Get Current Space ID
  const { space_id } = useParams();

  // Get space value stored in Redux Store.
  const currentSpaceState = useAppSelector(
    (state) => state.spaces?.currentSpace
  );

  /**
   * Add new note.
   *
   * @param formData Form fields value.
   */
  const formSubmitAction = (formData?: Record<string, unknown>) => {
    sendToIpcMain(
      IPCRequestObject(`notes-add`, {
        ...formData,
        space_id: Number(space_id),
      })
    );
  };

  return (
    <div className="notes">
      <div className="d-flex flex-column align-items-center note-form-section">
        <div className="note-card">
          <Form id="note-form-add" submitAction={formSubmitAction} />
        </div>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly notes-list">
        {currentSpaceState?.notes.map((note: NoteStoreType) => (
          <Link
            key={note._id}
            to={`${location.pathname}/${note._id}`}
            className="note-card"
          >
            <TextArea
              id={`note-${note._id}`}
              name="note-note"
              value={note.note}
              readonly
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;

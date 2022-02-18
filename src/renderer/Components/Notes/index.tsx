/**
 * index.tsx
 *
 * Description:
 *    Notes Component.
 *
 */

import { IPCRequestObject } from 'common';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Modal, TextArea } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';
import { sendToIpcMain } from 'renderer/util';
import './notes.scss';

const Notes = () => {
  // Modal State
  const [modalState, setModalState] = useState(false);

  // Type of action. Add - 0, Update - 1.
  const [addOrUpdateState, setAddOrUpdateState] = useState(0);

  // Modal Details
  const [modalDetails, setModalDetails] = useState({} as NoteStoreType);

  // Get Current Space ID
  const { space_id } = useParams();

  // Get space value stored in Redux Store.
  const currentSpaceState = useAppSelector(
    (state) => state.spaces?.currentSpace
  );

  const getNoteWithId = (noteId: number) => {
    const currentNote = currentSpaceState?.notes.filter(
      ({ _id }: NoteStoreType) => _id == Number(noteId)
    )[0];

    return currentNote;
  };

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
    setModalState(!modalState);
  };

  useEffect(() => {
    if (modalState)
      setModalDetails(getNoteWithId(modalDetails._id) as NoteStoreType);
  }, [currentSpaceState]);

  /**
   * Update note.
   *
   * @param formData Form fields value.
   */
  const formUpdateAction = (formData?: Record<string, unknown>) => {
    sendToIpcMain(IPCRequestObject(`notes-update`, formData));
  };

  const openNote = (noteId: number) => {
    setAddOrUpdateState(1);
    setModalState(!modalState);
    setModalDetails(getNoteWithId(noteId) as NoteStoreType);
  };

  const addNoteModal = () => {
    setModalState(!modalState);
    setAddOrUpdateState(0);
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center note-form-section">
        <div
          className="d-flex flex-row justify-content-center align-items-center note-card"
          role="button"
          onClick={addNoteModal}
          onKeyPress={(event) => event.key === ` ` && addNoteModal()}
          tabIndex={0}
        >
          <Input
            id="note-add-preview"
            name="note-add"
            placeholder={`Let's Note it down ...`}
            readonly
          />
        </div>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly notes-list">
        {currentSpaceState?.notes.map((note: NoteStoreType) => (
          <div
            className="note-card"
            key={note._id}
            role="button"
            onClick={() => openNote(note._id)}
            onKeyPress={(event) => event.key === ` ` && openNote(note._id)}
            tabIndex={0}
          >
            <div className="d-flex flex-row align-items-center note-form-heading">
              <b>
                <i>Note #{note._id}</i>
              </b>
            </div>

            <hr />

            <TextArea
              id={`note-${note._id}`}
              name={`note-${note._id}`}
              value={note.note}
              readonly
            />
          </div>
        ))}
      </div>

      {modalState && (
        <Modal onClickClose={(value: boolean) => setModalState(value)}>
          <div className="d-flex flex-column justify-content-center align-items-center note-form-modal">
            {addOrUpdateState ? (
              <Form
                id="note-form-update"
                submitAction={formUpdateAction}
                formValues={modalDetails}
              />
            ) : (
              <Form id="note-form-add" submitAction={formSubmitAction} />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Notes;

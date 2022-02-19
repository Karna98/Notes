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
import { Form, Modal, TextArea } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';
import { sendToIpcMain } from 'renderer/util';
import './notes.scss';

const Notes = () => {
  // Modal State
  const [modalState, setModalState] = useState(false);

  // Type of Form. {Add_Credential: 0, Update_Credential: 1}.
  const [modalFormType, setModalFormType] = useState(0);

  // Form details opened in Modal.
  const [formDetails, setFormDetails] = useState({} as NoteStoreType);

  // Get current Space ID.
  const { space_id } = useParams();

  // Get current space details.
  const currentSpaceState = useAppSelector(
    (state) => state.spaces?.currentSpace
  );

  /**
   * Get Note for provided ID.
   *
   * @param noteId Note ID.
   * @returns {NoteStoreType} Note.
   */
  const getNoteWithId = (noteId: number) => {
    return currentSpaceState?.notes.filter(
      ({ _id }: NoteStoreType) => _id == Number(noteId)
    )[0];
  };

  /**
   * Update states to add new Note.
   */
  const addNoteForm = () => {
    setModalFormType(0);
    setModalState(!modalState);
  };

  /**
   * Update states to update Note.
   *
   * @param noteId Note ID to be updated.
   */
  const openNoteForm = (noteId: number) => {
    setModalFormType(1);
    setFormDetails(getNoteWithId(noteId) as NoteStoreType);
    setModalState(!modalState);
  };

  /**
   * Form submit action to add new note.
   *
   * @param formData Form fields value.
   */
  const addNoteFormAction = (formData?: Record<string, unknown>) => {
    sendToIpcMain(
      IPCRequestObject(`notes-add`, {
        ...formData,
        space_id: Number(space_id),
      })
    );

    setModalState(!modalState);
  };

  /**
   * Form submit action to update note.
   *
   * @param formData Form fields value.
   */
  const updateNoteFormAction = (formData?: Record<string, unknown>) => {
    sendToIpcMain(IPCRequestObject(`notes-update`, formData));
  };

  useEffect(() => {
    modalState &&
      setFormDetails(getNoteWithId(formDetails._id) as NoteStoreType);
  }, [currentSpaceState]);

  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center note-form-section">
        <h2>Notes</h2>
        <div
          className="d-flex flex-row justify-content-center align-items-center note-card"
          role="button"
          onClick={addNoteForm}
          onKeyPress={(event) => event.key === ` ` && addNoteForm()}
          tabIndex={0}
        >
          Add Note
        </div>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly notes-list">
        {currentSpaceState?.notes.map((note: NoteStoreType) => (
          <div
            className="note-card"
            key={note._id}
            role="button"
            onClick={() => openNoteForm(note._id)}
            onKeyPress={(event) => event.key === ` ` && openNoteForm(note._id)}
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
            {modalFormType ? (
              <Form
                id="note-form-update"
                submitAction={updateNoteFormAction}
                formValues={formDetails}
              />
            ) : (
              <Form id="note-form-add" submitAction={addNoteFormAction} />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Notes;

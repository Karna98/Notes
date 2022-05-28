/**
 * index.tsx
 *
 * Description:
 *    Notes Component.
 *
 */

import { CONSTANT } from 'common';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Modal, TextArea } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';
import { sendToMainWrapper } from 'renderer/util';
import './notes.scss';

const Notes = () => {
  // Modal State
  const [modalState, setModalState] = useState(false);

  // Type of Form. {Add_Note: 0, Update_Note: 1}.
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
    sendToMainWrapper(CONSTANT.ROUTE.NOTE.ADD, {
      ...formData,
      space_id: Number(space_id),
    });

    setModalState(!modalState);
  };

  /**
   * Form submit action to update note.
   *
   * @param formData Form fields value.
   */
  const updateNoteFormAction = (formData?: Record<string, unknown>) => {
    sendToMainWrapper(CONSTANT.ROUTE.NOTE.UPDATE, formData);
  };

  useEffect(() => {
    modalState &&
      setFormDetails(getNoteWithId(formDetails._id) as NoteStoreType);
  }, [currentSpaceState]);

  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center space-header unselectable">
        <h2>Notes</h2>

        <div
          className="d-flex flex-row justify-content-center align-items-center add-note-button"
          role="button"
          onClick={addNoteForm}
          onKeyPress={(event) => event.key === ` ` && addNoteForm()}
          tabIndex={0}
        >
          &#x1F7A6; &nbsp; <b>Note</b>
        </div>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly notes-list unselectable">
        {currentSpaceState?.notes.map((noteObject: NoteStoreType) => (
          <div
            className="note-card"
            key={noteObject._id}
            role="button"
            onClick={() => openNoteForm(noteObject._id)}
            onKeyPress={(event) =>
              event.key === ` ` && openNoteForm(noteObject._id)
            }
            tabIndex={0}
          >
            <div className="d-flex flex-row align-items-center note-heading">
              <b>Note #{noteObject._id}</b>
            </div>

            <TextArea
              id={`note-${noteObject._id}`}
              name={`note-${noteObject._id}`}
              value={noteObject.note}
              tabIndex={-1}
              readonly
            />
          </div>
        ))}
      </div>

      {modalState && (
        <Modal
          onClickClose={(value: boolean) => setModalState(value)}
          title={modalFormType ? `Note #${formDetails?._id}` : `New Note`}
        >
          {modalFormType ? (
            <Form
              id="note-form-update"
              submitAction={updateNoteFormAction}
              formValues={formDetails}
            />
          ) : (
            <Form id="note-form-add" submitAction={addNoteFormAction} />
          )}
        </Modal>
      )}
    </>
  );
};

export default Notes;

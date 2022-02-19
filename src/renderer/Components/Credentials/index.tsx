/**
 * index.tsx
 *
 * Description:
 *    Credentials Component.
 *
 */

import { IPCRequestObject } from 'common';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Modal } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';
import { sendToIpcMain } from 'renderer/util';
import './credentials.scss';

const Credentials = () => {
  // Modal State
  const [modalState, setModalState] = useState(false);

  // Type of action. Add - 0, Update - 1.
  const [addOrUpdateState, setAddOrUpdateState] = useState(0);

  // Modal Details
  const [modalDetails, setModalDetails] = useState({} as CredentialStoreType);

  // Get Current Space IDF
  const { space_id } = useParams();

  // Get space value stored in Redux Store.
  const currentSpaceState = useAppSelector(
    (state) => state.spaces?.currentSpace
  );

  const getCredentialWithId = (credentialId: number) => {
    const currentCredential = currentSpaceState?.credentials.filter(
      ({ _id }: CredentialStoreType) => _id == Number(credentialId)
    )[0];

    return currentCredential;
  };

  useEffect(() => {
    if (modalState)
      setModalDetails(
        getCredentialWithId(modalDetails._id) as CredentialStoreType
      );
  }, [currentSpaceState]);

  /**
   * Add new credential.
   *
   * @param formData Form fields value.
   */
  const formSubmitAction = (formData?: Record<string, unknown>) => {
    sendToIpcMain(
      IPCRequestObject(`credentials-add`, {
        ...formData,
        space_id: Number(space_id),
      })
    );
    setModalState(!modalState);
  };

  /**
   * Update new credential.
   *
   * @param formData Form fields value.
   */
  const formUpdateAction = (formData?: Record<string, unknown>) => {
    sendToIpcMain(IPCRequestObject(`credentials-update`, formData));
  };

  const openCredential = (credentialId: number) => {
    setAddOrUpdateState(1);
    setModalState(!modalState);
    setModalDetails(getCredentialWithId(credentialId) as CredentialStoreType);
  };

  const addCredentialModal = () => {
    setModalState(!modalState);
    setAddOrUpdateState(0);
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center credential-form-section">
        <div
          className="d-flex flex-row justify-content-center align-items-center credential-card"
          role="button"
          onClick={addCredentialModal}
          onKeyPress={(event) => event.key === ` ` && addCredentialModal()}
          tabIndex={0}
        >
          <Input
            id="credential-add-preview"
            name="credential-add"
            placeholder={`Title or Website name ...`}
            readonly
          />
        </div>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly credentials-list">
        {currentSpaceState?.credentials.map(
          (credentialObject: CredentialStoreType) => (
            <div
              className="credential-card"
              key={credentialObject._id}
              role="button"
              onClick={() => openCredential(credentialObject._id)}
              onKeyPress={(event) =>
                event.key === ` ` && openCredential(credentialObject._id)
              }
              tabIndex={0}
            >
              <div className="d-flex flex-row align-items-center note-form-heading">
                <b>
                  <i>Credential #{credentialObject._id}</i>
                </b>
              </div>

              <hr />
              {credentialObject.credential.title}
            </div>
          )
        )}
      </div>

      {modalState && (
        <Modal onClickClose={(value: boolean) => setModalState(value)}>
          <div className="d-flex flex-column justify-content-center align-items-center credential-form-modal">
            {addOrUpdateState ? (
              <Form
                id="credential-form-update"
                submitAction={formUpdateAction}
                formValues={modalDetails}
              />
            ) : (
              <Form id="credential-form-add" submitAction={formSubmitAction} />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Credentials;

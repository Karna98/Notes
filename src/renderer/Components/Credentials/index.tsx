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
import { Form, Modal } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';
import { sendToIpcMain } from 'renderer/util';
import './credentials.scss';

const Credentials = () => {
  // Modal State (Open or CLose).
  const [modalState, setModalState] = useState(false);

  // Type of Form. {Add_Credential: 0, Update_Credential: 1}.
  const [modalFormType, setModalFormType] = useState(0);

  // Form details opened in Modal.
  const [formDetails, setFormDetails] = useState({} as CredentialStoreType);

  // Get current Space ID.
  const { space_id } = useParams();

  // Get current space details.
  const currentSpaceState = useAppSelector(
    (state) => state.spaces?.currentSpace
  );

  /**
   * Get Credential for provided ID.
   *
   * @param credentialId Credential ID.
   * @returns {CredentialStoreType} Credential.
   */
  const getCredentialWithId = (credentialId: number) => {
    return currentSpaceState?.credentials.filter(
      ({ _id }: CredentialStoreType) => _id == Number(credentialId)
    )[0];
  };

  /**
   * Update states to add new Credential.
   */
  const addCredentialForm = () => {
    setModalFormType(0);
    setModalState(!modalState);
  };

  /**
   * Update states to update Credential.
   *
   * @param credentialId Credential ID to be updated.
   */
  const openCredentialForm = (credentialId: number) => {
    setModalFormType(1);
    setFormDetails(getCredentialWithId(credentialId) as CredentialStoreType);
    setModalState(!modalState);
  };

  /**
   * Form submit action to add new credential.
   *
   * @param formData Form fields value.
   */
  const addCredentialFormAction = (formData?: Record<string, unknown>) => {
    sendToIpcMain(
      IPCRequestObject(`credentials-add`, {
        ...formData,
        space_id: Number(space_id),
      })
    );

    setModalState(!modalState);
  };

  /**
   * Form submit action to update credential.
   *
   * @param formData Form fields value.
   */
  const updateCredentialFormAction = (formData?: Record<string, unknown>) => {
    sendToIpcMain(IPCRequestObject(`credentials-update`, formData));
  };

  useEffect(() => {
    modalState &&
      setFormDetails(
        getCredentialWithId(formDetails._id) as CredentialStoreType
      );
  }, [currentSpaceState]);

  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center credential-form-section">
        <h2>Credentials</h2>

        <div
          className="d-flex flex-row justify-content-center align-items-center credential-card"
          role="button"
          onClick={addCredentialForm}
          onKeyPress={(event) => event.key === ` ` && addCredentialForm()}
          tabIndex={0}
        >
          Add Credential
        </div>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly credentials-list">
        {currentSpaceState?.credentials.map(
          (credentialObject: CredentialStoreType) => (
            <div
              className="credential-card"
              key={credentialObject._id}
              role="button"
              onClick={() => openCredentialForm(credentialObject._id)}
              onKeyPress={(event) =>
                event.key === ` ` && openCredentialForm(credentialObject._id)
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
            {modalFormType ? (
              <Form
                id="credential-form-update"
                submitAction={updateCredentialFormAction}
                formValues={formDetails}
              />
            ) : (
              <Form
                id="credential-form-add"
                submitAction={addCredentialFormAction}
              />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Credentials;

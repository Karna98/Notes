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
import { useAppDispatch, useAppSelector } from 'renderer/Hooks';
import { clearVolatileState } from 'renderer/State';
import { sendToIpcMain } from 'renderer/util';
import './credentials.scss';

const BASE_IDENTIFIER = `auth-pin`;

const ROUTE_CRED_AUTH_SETUP = BASE_IDENTIFIER + `-credential-setup`;
const ROUTE_CRED_AUTH_VERIFY = BASE_IDENTIFIER + `-credential-verify`;

const ROUTE_CRED_ADD = `credential-add`;
const ROUTE_CRED_UPDATE = `credential-update`;

const FORM_AUTH_SETUP = BASE_IDENTIFIER + `-` + `form-setup`;
const FORM_AUTH_VERIFY = BASE_IDENTIFIER + `-` + `form-verify`;

const FORM_CRED_ADD = `credential-form-add`;
const FORM_CRED_UPDATE = `credential-form-update`;

const forms: Record<string, Partial<FormInterface>> = {
  CRED_ADD: {
    id: FORM_CRED_ADD,
    submitAction: undefined,
  },
  CRED_UPDATE: {
    id: FORM_CRED_UPDATE,
    submitAction: undefined,
  },
  CRED_AUTH_SETUP: {
    id: FORM_AUTH_SETUP,
    submitAction: undefined,
  },
  CRED_AUTH_VERIFY: {
    id: FORM_AUTH_VERIFY,
    submitAction: undefined,
  },
};

const sentToMain = (route: string, data: object) => {
  sendToIpcMain(IPCRequestObject(route, data));
};

const CredentialAuthComponent = ({
  formAttributes,
  setModalState,
  sessionState,
  formDetails,
}: {
  formAttributes: FormInterface;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  sessionState: SessionType | null;
  formDetails?: object;
}) => {
  /**
   * Submit Cred Auth PIN form.
   *
   * @param formData Form fields value
   */
  const credPinSubmitAction = (formData?: Record<string, unknown>): void => {
    sentToMain(ROUTE_CRED_AUTH_SETUP, {
      _id: sessionState?._id,
      l_pin: sessionState?.l_pin,
      s_pin: formData?.pin,
    });
  };

  /**
   * Verify Cred Auth PIN form
   *
   * @param formData Form fields value
   */
  const credPinVerifyAction = (formData?: Record<string, unknown>): void => {
    const dataObject =
      sessionState?.s_pin === undefined
        ? {
            l_pin: sessionState?.l_pin,
            s_pin: formData?.pin,
            data: formDetails,
          }
        : {
            s_pin: sessionState?.s_pin,
            data: formDetails,
          };

    sentToMain(ROUTE_CRED_AUTH_VERIFY, dataObject);
  };

  formAttributes.submitAction =
    formAttributes.id === FORM_AUTH_SETUP
      ? credPinSubmitAction
      : credPinVerifyAction;

  return (
    <Modal title="" onClickClose={(value: boolean) => setModalState(value)}>
      <Form {...(formAttributes as FormInterface)} />
    </Modal>
  );
};

const CredentialFormComponent = ({
  formAttributes,
  setModalState,
  formDetails,
}: {
  formAttributes: FormInterface;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  formDetails?: CredentialStoreType;
}) => {
  const dispatch = useAppDispatch();

  return (
    <Modal
      onClickClose={(value: boolean) => {
        setModalState(value);
        formAttributes.id === FORM_CRED_UPDATE &&
          dispatch(clearVolatileState());
      }}
      title={
        formAttributes.id === FORM_CRED_ADD
          ? `New Credential`
          : `Credential #${formDetails?._id}`
      }
    >
      <div className="d-flex flex-column justify-content-center align-items-center credential-modal">
        <Form {...formAttributes} formValues={formDetails} />
      </div>
    </Modal>
  );
};

const Credentials = () => {
  // Modal State (Open or CLose).
  const [modalState, setModalState] = useState(false);

  // Type of Form. {Add_Credential: 0, Update_Credential: 1}.
  const [modalFormType, setModalFormType] = useState(0);

  // Form details opened in Modal.
  const [formDetails, setFormDetails] = useState({} as CredentialStoreType);

  // Get current Space ID.
  const { space_id } = useParams();

  // Get session value stored in Redux Store.
  const sessionState = useAppSelector((state) => state.session);

  // Get session value stored in Redux Store.
  const volatileState = useAppSelector((state) => state.volatile);

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
    const currentCredential = getCredentialWithId(credentialId);
    setModalFormType(1);
    setFormDetails(currentCredential as CredentialStoreType);
    setModalState(!modalState);

    if (sessionState?.s_pin != undefined)
      sentToMain(ROUTE_CRED_AUTH_VERIFY, {
        s_pin: sessionState?.s_pin,
        data: currentCredential,
      });
  };

  /**
   * Form submit action to add new credential.
   *
   * @param formData Form fields value.
   */
  const addCredentialFormAction = (formData?: Record<string, unknown>) => {
    sendToIpcMain(
      IPCRequestObject(ROUTE_CRED_ADD, {
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
    sendToIpcMain(IPCRequestObject(ROUTE_CRED_UPDATE, formData));
  };

  useEffect(() => {
    forms.CRED_ADD.submitAction = addCredentialFormAction;
    forms.CRED_UPDATE.submitAction = updateCredentialFormAction;

    modalState &&
      setFormDetails(
        getCredentialWithId(formDetails._id) as CredentialStoreType
      );
  }, [currentSpaceState]);

  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center space-header unselectable">
        <h2>Credentials</h2>

        <div
          className="d-flex flex-row justify-content-center align-items-center add-credential-button"
          role="button"
          onClick={addCredentialForm}
          onKeyPress={(event) => event.key === ` ` && addCredentialForm()}
          tabIndex={0}
        >
          &#x1F7A6; &nbsp; <b>Credential</b>
        </div>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly credentials-list unselectable">
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
              <div className="d-flex flex-row align-items-center credential-heading">
                <b>Credential #{credentialObject._id}</b>
              </div>
              <p>{credentialObject.credential.title}</p>
            </div>
          )
        )}
      </div>

      {modalState &&
        (sessionState?.sPinStatus ? (
          modalFormType == 0 ? (
            <CredentialFormComponent
              formAttributes={forms.CRED_ADD as FormInterface}
              setModalState={setModalState}
            />
          ) : volatileState._id == -1 ? (
            sessionState?.s_pin === undefined && (
              <CredentialAuthComponent
                formAttributes={forms.CRED_AUTH_VERIFY as FormInterface}
                setModalState={setModalState}
                sessionState={sessionState}
                formDetails={formDetails}
              />
            )
          ) : (
            <CredentialFormComponent
              formAttributes={forms.CRED_UPDATE as FormInterface}
              setModalState={setModalState}
              formDetails={formDetails}
            />
          )
        ) : (
          <CredentialAuthComponent
            formAttributes={forms.CRED_AUTH_SETUP as FormInterface}
            setModalState={setModalState}
            sessionState={sessionState}
          />
        ))}
    </>
  );
};

export default Credentials;

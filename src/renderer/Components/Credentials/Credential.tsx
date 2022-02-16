/**
 * Credential.tsx
 *
 * Description:
 *    Credential Component.
 *
 */

import { IPCRequestObject } from 'common';
import { useParams } from 'react-router-dom';
import { Form } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';
import { sendToIpcMain } from 'renderer/util';

const Credential = () => {
  // Infer credential_id passed in URL.
  const { credential_id } = useParams();

  // Get credentials List stored in Redux Store.
  const credentialsListState = useAppSelector(
    (state) => state.spaces?.currentSpace?.credentials
  );

  const currentCredential = credentialsListState?.filter(
    ({ _id }: CredentialStoreType) => _id == Number(credential_id)
  )[0];

  /**
   * Update new credential.
   *
   * @param formData Form fields value.
   */
  const formSubmitAction = (formData?: Record<string, unknown>) => {
    sendToIpcMain(IPCRequestObject(`credentials-update`, formData));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center credential-form-update-section">
      <div className="credential-card">
        <Form
          id="credential-form-update"
          submitAction={formSubmitAction}
          formValues={currentCredential}
        />
      </div>
    </div>
  );
};

export default Credential;

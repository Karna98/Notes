/**
 * Credential.tsx
 *
 * Description:
 *    Credential Component.
 *
 */

import { useParams } from 'react-router-dom';
import { Form } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';

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
    console.log(`Update Credential:\n`, formData);
  };

  const formValues = {
    title: currentCredential?.credential.title,
    ...currentCredential?.credential.secure.reduce(
      (previousElementObject, { name, ...otherAttributes }) => ({
        ...previousElementObject,
        [name]: otherAttributes.value,
      }),
      {}
    ),
    updated_at: currentCredential?.updated_at,
  };

  return (
    <div className="credentials">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="credential-form-update-section credential-card">
          <Form
            id="credential-form-update"
            submitAction={formSubmitAction}
            formValues={formValues}
          />
        </div>
      </div>
    </div>
  );
};

export default Credential;

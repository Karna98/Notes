/**
 * Credential.tsx
 *
 * Description:
 *    Credential Component.
 *
 */

import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';

const Credential = () => {
  const navigate = useNavigate();

  // Infer credential_id passed in URL.
  const { credential_id } = useParams();

  // Get credentials List stored in Redux Store.
  const credentialsListState = useAppSelector(
    (state) => state.spaces?.currentSpace?.credentials
  );

  const currentCredential = credentialsListState?.filter(
    ({ _id }: CredentialStoreType) => _id == Number(credential_id)
  )[0];

  const onClose = () => {
    navigate(-1);
  };

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
  };

  return (
    <>
      <div>
        <b>Credential-ID:</b> {currentCredential?._id}
        <br />
        <b>Last Updated at: </b>
        {currentCredential &&
          new Date(currentCredential.updated_at).toLocaleString(`en-IN`, {
            hourCycle: `h23`,
          })}
        <hr />
        <div>
          <Form
            id="form-credential-update"
            submitAction={formSubmitAction}
            formValues={formValues}
          />
        </div>
      </div>

      <div>
        <Button id="close-credential" label="Close" onClick={onClose} />
      </div>
    </>
  );
};

export default Credential;

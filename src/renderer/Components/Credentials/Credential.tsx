/**
 * Credential.tsx
 *
 * Description:
 *    Credential Component.
 *
 */

import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';

const Credential = () => {
  const navigate = useNavigate();

  // Infer note_id passed in URL.
  const { credential_id } = useParams();

  // Get space value stored in Redux Store.
  const credentialsListState = useAppSelector(
    (state) => state.spaces?.currentSpace?.credentials
  );

  const currentCredential = credentialsListState?.filter(
    ({ _id }: CredentialStoreType) => _id == Number(credential_id)
  )[0];

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        <p>
          <b>Credential-ID:</b> {currentCredential?._id}
          <br />
          <b>Last Updated at: </b>
          {currentCredential &&
            new Date(currentCredential.updated_at).toLocaleString('en-IN', {
              hourCycle: 'h23',
            })}
        </p>
        <hr />
        <div>
          <h2>{currentCredential?.credential.title}</h2>
          {currentCredential?.credential.secure.map((secureCredential) => (
            <p key={secureCredential.name}>
              <b>{secureCredential.name}</b>: {secureCredential.value}
            </p>
          ))}
        </div>
      </div>

      <div>
        <Button id="close-note" label="Close Credential" onClick={onClose} />
      </div>
    </>
  );
};

export default Credential;

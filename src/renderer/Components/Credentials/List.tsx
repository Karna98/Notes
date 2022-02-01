/**
 * List.tsx
 *
 * Description:
 *    List all the Credentials.
 *
 */

import { IPCRequestObject } from 'common';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from 'renderer/Hooks';
import { sendToIpcMain } from 'renderer/util';
import AddCredentialForm from '../Elements/Form/CredentialForm';

const List = () => {
  const location = useLocation();

  // Get Current Space ID
  const { space_id } = useParams();

  // Get space value stored in Redux Store.
  const currentSpaceState = useAppSelector(
    (state) => state.spaces?.currentSpace
  );

  const formSubmitAction = (formData: Record<string, unknown>) => {
    sendToIpcMain(
      IPCRequestObject(`credentials-add`, {
        credential: { ...formData },
        space_id: Number(space_id),
      })
    );
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex flex-column align-items-center add-credential-card">
        <AddCredentialForm submitAction={formSubmitAction} />
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly">
        {currentSpaceState?.credentials.map(
          (credentialObject: CredentialStoreType) => (
            <Link
              key={credentialObject._id}
              to={`${location.pathname}/${credentialObject._id}`}
              className="credential-card"
            >
              {credentialObject.credential.title}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default List;

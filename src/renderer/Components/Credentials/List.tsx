/**
 * List.tsx
 *
 * Description:
 *    List all the Credentials.
 *
 */

import { IPCRequestObject } from 'common';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Form } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';
import { sendToIpcMain } from 'renderer/util';

const List = () => {
  const location = useLocation();

  // Get Current Space IDF
  const { space_id } = useParams();

  // Get space value stored in Redux Store.
  const currentSpaceState = useAppSelector(
    (state) => state.spaces?.currentSpace
  );

  /**
   * Add new credential.
   *
   * @param formData Form fields value.
   */
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
        <Form
          id="form-credential-add"
          submitAction={formSubmitAction}
          elements={{}}
        />
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

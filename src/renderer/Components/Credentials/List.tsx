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
  const formSubmitAction = (formData?: Record<string, unknown>) => {
    sendToIpcMain(
      IPCRequestObject(`credentials-add`, {
        ...formData,
        space_id: Number(space_id),
      })
    );
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center credential-form-section">
        <div className="d-flex flex-column align-items-center credential-card">
          <Form id="credential-form-add" submitAction={formSubmitAction} />
        </div>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly credentials-list">
        {currentSpaceState?.credentials.map(
          (credentialObject: CredentialStoreType) => (
            <Link
              key={credentialObject._id}
              to={`${location.pathname}/${credentialObject._id}`}
              className="d-flex flex-column justify-content-center align-items-center credential-card"
            >
              {credentialObject.credential.title}
            </Link>
          )
        )}
      </div>
    </>
  );
};

export default List;

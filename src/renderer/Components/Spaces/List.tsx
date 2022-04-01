/**
 * List.tsx
 *
 * Description:
 *    List all the Spaces.
 *
 */

import { createMessage, IPCRequestObject, resolveReactRoutes } from 'common';
import { useNavigate } from 'react-router-dom';
import { Form } from 'renderer/Components';
import { useAppDispatch, useAppSelector } from 'renderer/Hooks';
import { setMessageState } from 'renderer/State';
import { sendToIpcMain } from 'renderer/util';

const List = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get session value stored in Redux Store.
  const sessionState = useAppSelector((state) => state.session);

  // Get spaces value stored in Redux Store.
  const spacesState = useAppSelector((state) => state.spaces);

  const navigateToSpace = (space_id: number) =>
    navigate(resolveReactRoutes('space', { space_id }));

  /**
   * Adds new space.
   *
   * @param formData Form fields value.
   */
  const formSubmitAction = (formData?: Record<string, unknown>) => {
    if (
      formData &&
      spacesState?.list.some(
        ({ space_name }) => space_name === formData.space_name
      )
    )
      // Check if new space name already exists.
      dispatch(
        setMessageState(
          createMessage(
            `client-error`,
            `Space with name "${formData.space_name}" already exists.`
          )
        )
      );
    else sendToIpcMain(IPCRequestObject(`spaces-add`, formData));
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-evenly spaces-greeting">
        <h2>Hello, {sessionState?.username}</h2>
        <b>Which Space to explore today?</b>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly align-items-center spaces-list">
        {spacesState == null ? (
          <h2> Loading.. </h2>
        ) : (
          <>
            {spacesState.list.map((value: SpacesTableInterface) => (
              <div
                key={value._id}
                role="link"
                onClick={() => navigateToSpace(value._id)}
                onKeyPress={(event) =>
                  event.key === ` ` && navigateToSpace(value._id)
                }
                tabIndex={0}
                className="d-flex justify-content-center align-items-center space-card"
              >
                <h3>{value.space_name}</h3>
              </div>
            ))}

            {spacesState.list.length <
              (spacesState.metaData.SPACES_MAX_COUNT_ALLOWED as number) && (
              <div className="d-flex justify-content-center align-items-center space-card-form">
                <Form id="space-form-add" submitAction={formSubmitAction} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default List;

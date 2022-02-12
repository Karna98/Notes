/**
 * List.tsx
 *
 * Description:
 *    List all the Spaces.
 *
 */

import { createMessage, IPCRequestObject } from 'common';
import { Link } from 'react-router-dom';
import { Form } from 'renderer/Components';
import { useAppDispatch, useAppSelector } from 'renderer/Hooks';
import { setMessageState } from 'renderer/State';
import { sendToIpcMain } from 'renderer/util';

const List = () => {
  const dispatch = useAppDispatch();

  // Get session value stored in Redux Store.
  const sessionState = useAppSelector((state) => state.session);

  // Get spaces value stored in Redux Store.
  const spacesState = useAppSelector((state) => state.spaces);

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
            -1,
            `Space with name "${formData.space_name}" already exists.`
          )
        )
      );
    else sendToIpcMain(IPCRequestObject(`spaces-add`, formData));
  };

  return (
    <div className="spaces">
      <div className="d-flex flex-column justify-content-evenly spaces-greeting">
        <h3>Hello, {sessionState?.username}.</h3>
        <p>
          <b>Which Space to explore today?</b>
        </p>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly align-items-center spaces-list">
        {spacesState == null ? (
          <h2> Loading.. </h2>
        ) : (
          <>
            {spacesState.list.map((value: SpacesTableInterface) => (
              <Link
                to={`${value._id}`}
                key={value._id}
                className="d-flex justify-content-center align-items-center space-card"
                aria-disabled
              >
                {value.space_name}
              </Link>
            ))}

            {spacesState.list.length <
              (spacesState.metaData.SPACES_MAX_COUNT_ALLOWED as number) && (
              <div className="d-flex flex-column justify-content-evenly align-items-center space-card">
                <Form id="space-form-add" submitAction={formSubmitAction} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default List;

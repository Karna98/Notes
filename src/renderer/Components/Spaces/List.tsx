/**
 * List.tsx
 *
 * Description:
 *    List all the Spaces.
 *
 */

import { CONSTANT, createMessage } from 'common';
import { DivLink, Form } from 'renderer/Components';
import { useAppDispatch, useAppSelector } from 'renderer/Hooks';
import { setMessageState } from 'renderer/State';
import { resolveReactRoutes, sendToMainWrapper } from 'renderer/util';

// Constant String.
const { IPC, MSG_CODE } = CONSTANT;
const { ROUTE } = CONSTANT.REACT;

// Constant Message String.
const MSG_STR = {
  SPACE_EXISTS: {
    FUNC: (spaceName: string) =>
      `Space with name "${spaceName}" already exists.`,
  },
};

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
            MSG_CODE.ERR_CLIENT,
            MSG_STR.SPACE_EXISTS.FUNC(formData.space_name as string)
          )
        )
      );
    else sendToMainWrapper(IPC.ROUTE.SPACE.ADD, formData);
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-evenly spaces-greeting unselectable">
        <h2>Hello, {sessionState?.username}</h2>
        <b>Which Space to explore today?</b>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly align-items-center spaces-list unselectable">
        {spacesState == null ? (
          <h2> Loading.. </h2>
        ) : (
          <>
            {spacesState.list.map((value: SpacesTableInterface) => (
              <DivLink
                key={value._id}
                id={`${value._id}`}
                to={resolveReactRoutes(ROUTE.SPACES.SPACE.ID, {
                  space_id: value._id,
                })}
                className="d-flex justify-content-center align-items-center space-card"
              >
                <h3>{value.space_name}</h3>
              </DivLink>
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

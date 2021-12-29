/**
 * List.tsx
 *
 * Description:
 *    List all the Spaces.
 *
 */

import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IPCRequestObject } from '../../../common/util';
import { updateMessageState, updateSpacesState } from '../../State/reducer';
import { sendToIpcMain } from '../../util';
import Form from '../Elements/Form';

const List = () => {
  const dispatch = useDispatch();

  // Get session value stored in Redux Store.
  const sessionState = useSelector((state: RootStateOrAny) => state.session);
  // Get response value stored in Redux Store.
  const responseState = useSelector((state: RootStateOrAny) => state.response);
  // Get spaces value stored in Redux Store.
  const spacesState = useSelector((state: RootStateOrAny) => state.spaces);

  // Form Elements.
  const formElements: FormElementsInterface = {
    input: [
      {
        id: 'spaces-space_name',
        name: 'space_name',
        type: 'text',
        placeholder: 'New Space',
        required: true,
        value: '',
      },
    ],
    button: [
      {
        id: 'add-space',
        label: 'Add',
      },
    ],
  };

  /**
   * Adds new space.
   *
   * @param formData Form fields value.
   */
  const formSubmitAction = (formData: Record<string, unknown>) => {
    sendToIpcMain(IPCRequestObject(`spaces-add`, formData));
  };

  /**
   * Displays Message.
   *
   * @param status Message Status.
   * @param message Message.
   */
  const dispatchMessage = (status: number, message: string) => {
    dispatch(updateMessageState(status, message));
  };

  /**
   * Resolves Response received.
   */
  const resolveResponse = () => {
    switch (responseState.URI) {
      case 'spaces-get':
        if (responseState.status == 200 && spacesState == null)
          dispatch(updateSpacesState(responseState.data));
        break;

      case 'spaces-add':
        if (
          responseState.status == 200 &&
          spacesState.list.length != responseState.data.list.length
        ) {
          dispatchMessage(responseState.status, responseState.message);
          dispatch(updateSpacesState(responseState.data));
        } else if (responseState.status == 500) {
          // If Space was not added successfully.
          dispatchMessage(responseState.status, responseState.message);
        }
        break;
    }
  };

  useEffect(() => {
    responseState != null && resolveResponse();
  }, [responseState]);

  return (
    <>
      <div className="spaces-top">
        <h4>Hey, {sessionState.username}</h4>
        <b>Which space you want to dive in ?</b>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly align-items-center spaces-content">
        {spacesState == null ? (
          <div> Loading.. </div>
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
              spacesState.metaData.SPACES_MAX_COUNT_ALLOWED && (
              <div>
                <Form
                  id="form-add-space"
                  method="POST"
                  elements={formElements}
                  submitAction={formSubmitAction}
                  reset={true}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default List;

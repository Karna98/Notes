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

  /**
   * Displays Message.
   *
   * @param status Message Status.
   * @param message Message.
   */
  const dispatchMessage = (status: number, message: string) => {
    dispatch(updateMessageState(status, message));
  };

  // Get session value stored in Redux Store.
  const sessionState = useSelector((state: RootStateOrAny) => state.session);
  // Get response value stored in Redux Store.
  const responseState = useSelector((state: RootStateOrAny) => state.response);
  // Get spaces value stored in Redux Store.
  const spacesState = useSelector((state: RootStateOrAny) => state.spaces);

  // Total no. of space can be created.
  const TOTAL_SPACE_CARDS = 4;

  // Form Fields.
  const spacesForm: SpaceFormType = {
    space_name: '',
  };

  // Form Input Element Attributes.
  const InputElementData = [
    {
      type: 'text',
      name: 'space_name',
      placeholder: 'New Space Name',
      required: true,
    },
  ];

  /**
   * Add new spaces.
   * @param formData Form fields data.
   */
  const addNewSpace = (formData: FormType) => {
    sendToIpcMain(IPCRequestObject(`spaces-add`, formData));
  };

  const resolveResponse = () => {
    switch (responseState.URI) {
      case 'spaces-get':
        if (responseState.status == 200 && spacesState == null)
          dispatch(updateSpacesState(responseState.data));
        break;

      case 'spaces-add':
        if (
          responseState.status == 200 &&
          spacesState.length != responseState.data.length
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
            {spacesState.map((value: SpacesType) => (
              <Link
                to={`${value._id}`}
                key={value._id}
                className="d-flex justify-content-center align-items-center space-card"
                aria-disabled
              >
                {value.space_name}
              </Link>
            ))}
            {spacesState.length < TOTAL_SPACE_CARDS && (
              <Form
                method="POST"
                formFields={spacesForm}
                inputElements={InputElementData}
                submitAction={addNewSpace}
                className="d-flex flex-column justify-content-center align-items-center space-card"
                reset={true}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default List;

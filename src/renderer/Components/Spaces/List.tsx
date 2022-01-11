/**
 * List.tsx
 *
 * Description:
 *    List all the Spaces.
 *
 */

import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IPCRequestObject } from '../../../common/util';
import { sendToIpcMain } from '../../util';
import Form from '../Elements/Form';

const List = () => {
  // Get session value stored in Redux Store.
  const sessionState = useSelector((state: RootStateOrAny) => state.session);

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

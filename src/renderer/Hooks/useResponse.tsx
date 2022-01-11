/**
 * useResponse.tsx
 *
 * Description:
 *    Response Hook to reolve received response .
 *
 */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { reactRoutes } from '../../common/routes';
import { IPCRequestObject } from '../../common/util';
import {
  addNoteState,
  addSpacesState,
  updateMessageState,
  updateNoteState,
  updateSessionState,
  updateSpacesState,
  updateSpaceState,
} from '../State/reducer';
import { sendToIpcMain } from '../util';

/**
 * Displays Message.
 *
 * @param status Message Status.
 * @param message Message.
 */
const dispatchMessage = (
  dispatch: Dispatch,
  status: number,
  message: string | undefined
) => {
  // Update Message in Redux Store..
  message && dispatch(updateMessageState(status, message));
};

const useResponse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resolveResponse = (responseData: IPCResponseInterface) => {
    switch (responseData.URI) {
      case 'auth-status':
        // Based on auth-status, Login or Register Page will be displayed.
        responseData.status == 200 && responseData.data == 0
          ? // Register Page
            navigate(reactRoutes.auth_register)
          : // Login Page
            navigate(reactRoutes.auth_login);
        break;

      case 'auth-register':
        // Display response message.
        dispatchMessage(
          dispatch,
          responseData.status as number,
          responseData.message
        );

        // Set Registration status to true.
        responseData.status == 200 && navigate(reactRoutes.auth_login);
        break;

      case 'auth-login':
        // Set Message to be displayed.
        dispatchMessage(
          dispatch,
          responseData.status as number,
          responseData.message
        );

        if (responseData.status == 200) {
          dispatch(updateSessionState(responseData.data as SessionType));
          sendToIpcMain(IPCRequestObject(`spaces-get`));

          // Redirect to Home page.
          navigate(reactRoutes.spaces);
        }
        break;

      case 'spaces-get':
        if (responseData.status == 200)
          dispatch(updateSpacesState(responseData.data as SpacesInterface));
        break;

      case 'spaces-add':
        if (responseData.status == 200) {
          dispatchMessage(dispatch, responseData.status, responseData.message);

          const newSpace = (responseData.data as SpacesInterface).list[0];
          dispatch(addSpacesState(newSpace));
        } else if (responseData.status == 500) {
          // If Space was not added successfully.
          dispatchMessage(dispatch, responseData.status, responseData.message);
        }
        break;

      case 'notes-get':
        if (responseData.status == 200)
          dispatch(updateSpaceState(responseData.data as SpaceInterface));
        break;

      case 'notes-add':
        if (responseData.status == 200) {
          dispatch(addNoteState(responseData.data as NotesTableInterface));
        } else if (responseData.status == 500) {
          // If Space was not added successfully.
          dispatchMessage(dispatch, responseData.status, responseData.message);
        }
        break;

      case 'notes-update':
        if (responseData.status == 200) {
          dispatch(
            updateNoteState(
              responseData.data as Pick<
                NotesTableInterface,
                '_id' | 'note' | 'updated_at'
              >
            )
          );
        } else if (responseData.status == 500) {
          dispatchMessage(dispatch, responseData.status, responseData.message);
        }
        break;
    }
  };

  useEffect(() => {
    window.NotesAPI.receive(`fromMain`, (responseData: string) => {
      resolveResponse(JSON.parse(responseData));
    });
  }, []);
};

export default useResponse;

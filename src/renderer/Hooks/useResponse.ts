/**
 * useResponse.ts
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
import { createMessage, IPCRequestObject } from '../../common/util';
import {
  addNoteState,
  addSpacesState,
  setMessageState,
  updateNoteState,
  updateSessionState,
  updateSpacesState,
  updateSpaceState,
} from '../State/reducer';
import { sendToIpcMain } from '../util';

/**
 * Displays Message.
 *
 * @param dispatch Dispatch Hook.
 * @param status Message Status.
 * @param message Message.
 */
const dispatchMessage = (
  dispatch: Dispatch,
  status: number,
  message: string | undefined
) => {
  // Update Message in Redux Store..
  message && dispatch(setMessageState(createMessage(status, message)));
};

const useResponse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resolveResponse = (response: IPCResponseInterface) => {
    switch (response.URI) {
      case 'auth-status':
        // Based on auth-status, Login or Register Page will be displayed.
        response.status == 200 && response.data == 0
          ? // Register Page
            navigate(reactRoutes.auth_register)
          : // Login Page
            navigate(reactRoutes.auth_login);
        break;

      case 'auth-register':
        // Display response message.
        dispatchMessage(dispatch, response.status as number, response.message);

        // Set Registration status to true.
        response.status == 200 && navigate(reactRoutes.auth_login);
        break;

      case 'auth-login':
        // Set Message to be displayed.
        dispatchMessage(dispatch, response.status as number, response.message);

        if (response.status == 200) {
          dispatch(updateSessionState(response.data as SessionType));
          sendToIpcMain(IPCRequestObject(`spaces-get`));

          // Redirect to Home page.
          navigate(reactRoutes.spaces);
        }
        break;

      case 'spaces-get':
        if (response.status == 200)
          dispatch(updateSpacesState(response.data as SpacesInterface));
        break;

      case 'spaces-add':
        if (response.status == 200) {
          dispatchMessage(dispatch, response.status, response.message);

          const newSpace = (response.data as SpacesInterface).list[0];
          dispatch(addSpacesState(newSpace));
        } else if (response.status == 500) {
          // If Space was not added successfully.
          dispatchMessage(dispatch, response.status, response.message);
        }
        break;

      case 'notes-get':
        if (response.status == 200)
          dispatch(updateSpaceState(response.data as SpaceInterface));
        break;

      case 'notes-add':
        if (response.status == 200) {
          dispatch(addNoteState(response.data as NotesTableInterface));
        } else if (response.status == 500) {
          // If Note was not added successfully.
          dispatchMessage(dispatch, response.status, response.message);
        }
        break;

      case 'notes-update':
        if (response.status == 200) {
          dispatch(
            updateNoteState(
              response.data as Pick<
                NotesTableInterface,
                '_id' | 'note' | 'updated_at'
              >
            )
          );
        } else if (response.status == 500) {
          dispatchMessage(dispatch, response.status, response.message);
        }
        break;
    }
  };

  useEffect(() => {
    window.NotesAPI.receive(`fromMain`, (response: string) => {
      resolveResponse(JSON.parse(response));
    });
  }, []);
};

export default useResponse;

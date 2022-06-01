/**
 * useResponse.ts
 *
 * Description:
 *    Response Hook to reolve received response .
 *
 */

import { CONSTANT, createMessage } from 'common';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import {
  addCredentialState,
  addNoteState,
  addSpaceState,
  setCurrentSpaceState,
  setMessageState,
  setSessionState,
  setSpacesState,
  setVolatileState,
  updateCredentialState,
  updateNoteState,
  updateSessionState,
} from 'renderer/State';
import { sendToMainWrapper } from 'renderer/util';
import { useAppDispatch } from '.';

// Constant String.
const { IPC } = CONSTANT;
const { ROUTE } = CONSTANT.REACT;

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const resolveResponse = (response: IPCResponseInterface) => {
    switch (response.URI) {
      case IPC.ROUTE.AUTH.STATUS:
        // Based on auth-status, Login or Register Page will be displayed.
        response.status == 200 && response.data == 0
          ? // Register Page
            navigate(ROUTE.AUTH.REGISTER)
          : // Login Page
            navigate(ROUTE.AUTH.LOGIN);
        break;

      case IPC.ROUTE.AUTH.REGISTER:
        // Display response message.
        dispatchMessage(dispatch, response.status as number, response.message);

        // Set Registration status to true.
        response.status == 200 && navigate(ROUTE.AUTH.LOGIN);
        break;

      case IPC.ROUTE.AUTH.LOGIN:
        // Set Message to be displayed.
        dispatchMessage(dispatch, response.status as number, response.message);

        if (response.status == 200) {
          dispatch(setSessionState(response.data as SessionType));

          // Redirect to Auth PIN.
          navigate(ROUTE.AUTH.PIN);
        }
        break;

      case IPC.ROUTE.AUTH_PIN.LOGIN:
        // Set Message to be displayed.
        dispatchMessage(dispatch, response.status as number, response.message);

        if (response.status == 200) {
          dispatch(setSessionState(response.data as SessionType));

          // Get list of spaces.
          sendToMainWrapper(IPC.ROUTE.SPACE.STATUS);
        }
        break;

      case IPC.ROUTE.AUTH_PIN.CRED_SETUP:
        if (response.status == 200)
          dispatch(
            updateSessionState({
              ...(response.data as AuthPinRequestType),
            })
          );

        // Set Message to be displayed.
        dispatchMessage(dispatch, response.status as number, response.message);
        break;

      case IPC.ROUTE.AUTH_PIN.CRED_VERIFY:
        if (response.status == 200) {
          const responseData = response.data as AuthPinRequestType;

          if (responseData?.s_pin != undefined)
            dispatch(
              updateSessionState({
                s_pin: responseData?.s_pin,
              })
            );

          if (responseData.data != undefined)
            dispatch(setVolatileState(responseData.data as CredentialDataType));
        } else {
          // Set Message to be displayed.
          dispatchMessage(
            dispatch,
            response.status as number,
            response.message
          );
        }
        break;

      case IPC.ROUTE.SPACE.STATUS:
        if (response.status == 200)
          dispatch(setSpacesState(response.data as SpacesInterface));
        break;

      case IPC.ROUTE.SPACE.ADD:
        if (response.status == 200) {
          dispatchMessage(dispatch, response.status, response.message);
          dispatch(addSpaceState(response.data as SpacesTableInterface));
        } else if (response.status == 500) {
          // If Space was not added successfully.
          dispatchMessage(dispatch, response.status, response.message);
        }
        break;

      case IPC.ROUTE.SPACE.GET:
        if (response.status == 200)
          dispatch(setCurrentSpaceState(response.data as SpaceInterface));
        break;

      case IPC.ROUTE.NOTE.ADD:
        if (response.status == 200) {
          dispatch(addNoteState(response.data as NotesTableInterface));
        } else if (response.status == 500) {
          // If Note was not added successfully.
          dispatchMessage(dispatch, response.status, response.message);
        }
        break;

      case IPC.ROUTE.NOTE.UPDATE:
        if (response.status == 200) {
          dispatch(updateNoteState(response.data as NoteStoreType));
        } else if (response.status == 500) {
          dispatchMessage(dispatch, response.status, response.message);
        }
        break;

      case IPC.ROUTE.CRED.ADD:
        if (response.status == 200)
          dispatch(addCredentialState(response.data as CredentialDataType));
        else if (response.status == 500) {
          // If Credential is not added successfully.
          dispatchMessage(dispatch, response.status, response.message);
        }
        break;

      case IPC.ROUTE.CRED.UPDATE:
        if (response.status == 200) {
          dispatch(setVolatileState(response.data as CredentialDataType));
          dispatch(updateCredentialState(response.data as CredentialStoreType));
        } else if (response.status == 500) {
          dispatchMessage(dispatch, response.status, response.message);
        }
        break;
    }
  };

  useEffect(() => {
    window.NotesAPI.receive(
      CONSTANT.CHANNEL_BUS.FROM[0],
      (response: string) => {
        resolveResponse(JSON.parse(response));
      }
    );
  }, []);
};

export default useResponse;

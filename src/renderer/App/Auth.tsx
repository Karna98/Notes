/**
 * Auth.tsx
 *
 * Description:
 *    Authentication Page (Register, Login).
 *
 */

import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reactRoutes } from '../../common/routes';
import { IPCRequestObject } from '../../common/util';
import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';
import { updateMessageState, updateSessionState } from '../State/reducer';
import { sendToIpcMain } from '../util';
import './auth.scss';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Response stored in Redux Store.
  const responseState = useSelector((state: RootStateOrAny) => state.response);

  // On rendering, Request will be sent only once. This will be tracked by requestStatus.
  const [requestStatus, setRequestStatus] = useState(false);

  // Registration Status of user.
  const [registrationStatus, setRegistrationStatus]: [
    boolean | undefined,
    React.Dispatch<React.SetStateAction<boolean | undefined>>
  ] = useState();

  /**
   * Displays Message.
   *
   * @param status Message Status.
   * @param message Message.
   */
  const dispatchMessage = (status: number, message: string) => {
    // Update Message in Redux Store..
    dispatch(updateMessageState(status, message));
  };

  /**
   * Resolves response received.
   */
  const resolveResponse = () => {
    switch (responseState.URI) {
      case 'auth-status':
        // Based on auth-status, Login or Register Page will be displayed.
        responseState.status == 200 && responseState.data == 0
          ? // Register Page
            setRegistrationStatus(false)
          : // Login Page
            setRegistrationStatus(true);
        break;

      case 'auth-register':
        // Display response message.
        dispatchMessage(responseState.status, responseState.message);

        // Set Registration status to true.
        responseState.status == 200 && setRegistrationStatus(true);
        break;

      case 'auth-login':
        // Set Message to be displayed.
        dispatchMessage(responseState.status, responseState.message);

        if (responseState.status == 200) {
          dispatch(updateSessionState(responseState.data));
          sendToIpcMain(IPCRequestObject(`spaces-get`));

          // Redirect to Home page.
          navigate(reactRoutes.spaces);
        }
        break;
    }
  };

  useEffect(() => {
    if (!requestStatus) {
      // Get Auth Status.
      sendToIpcMain(IPCRequestObject(`auth-status`));
      setRequestStatus(true);
    } else {
      // Resolve Response.
      responseState != null && resolveResponse();
    }
  }, [responseState]);

  return (
    <div className="d-flex flex-row align-items-center justify-items-center auth">
      {registrationStatus === undefined ? (
        <div> Loading.. </div>
      ) : registrationStatus ? (
        <Login />
      ) : (
        <Register />
      )}
    </div>
  );
};

export default Auth;

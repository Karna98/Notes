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
import { resolveReactRoute } from '../../common/routes';
import { IPCRequestObject } from '../../common/util';
import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';
import { updateMessageState, updateSessionState } from '../State/reducer';
import { sendToIpcMain } from '../util';
import './auth.scss';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get response value stored in Redux Store.
  const responseState = useSelector((state: RootStateOrAny) => state.response);

  // On rendering, Request will be sent only once. This will be tracked by requestStatus.
  const [requestStatus, setRequestStatus] = useState(false);

  // Registration Status of user.
  const [registrationStatus, setRegistrationStatus]: [
    boolean | undefined,
    React.Dispatch<React.SetStateAction<boolean | undefined>>
  ] = useState();

  useEffect(() => {
    if (!requestStatus) {
      // Check Auth Status.
      sendToIpcMain(IPCRequestObject(`auth-status`));

      setRequestStatus(true);
    } else {
      if (responseState != null)
        switch (responseState.URI) {
          case 'auth-status':
            // Based on auth-status, Login or Register Page will be displayed.

            if (responseState.status == 200) {
              // Register Page
              if (responseState.data == 0) setRegistrationStatus(false);
              // Login Page
              else setRegistrationStatus(true);
            }
            break;

          case 'auth-register':
            // Set Message to be Displayed.
            dispatch(
              updateMessageState(responseState.status, responseState.message)
            );

            if (responseState.status == 200) {
              setRegistrationStatus(true);
            }
            break;

          case 'auth-login':
            // Set Message to be Displayed.
            dispatch(
              updateMessageState(responseState.status, responseState.message)
            );

            if (responseState.status == 200) {
              dispatch(updateSessionState(responseState.data));

              // Redirect to Home page.
              navigate(resolveReactRoute('home'));
            }
            break;
        }
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

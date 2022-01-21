/**
 * Login.tsx
 *
 * Description:
 *    Login Component.
 *
 */

import React from 'react';
import { createMessage, IPCRequestObject } from '../../../common/util';
import { useAppDispatch } from '../../Hooks';
import { setMessageState } from '../../State/reducer';
import { sendToIpcMain } from '../../util';
import Form from '../Elements/Form';

const Login = () => {
  const dispatch = useAppDispatch();

  // Form Elements.
  const formElements: FormElementsInterface = {
    input: [
      {
        id: 'login-username',
        name: 'username',
        type: 'text',
        label: 'Username',
        placeholder: 'Username',
        required: true,
        value: '',
      },
      {
        id: 'login-password',
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Password',
        required: true,
        value: '',
      },
    ],
    button: [
      {
        id: 'login',
        label: 'Login',
      },
    ],
  };

  /**
   * Submit Login form.
   *
   * @param formData Form fields value
   */
  const formSubmitAction = (formData: Record<string, unknown>): void => {
    dispatch(setMessageState(createMessage(0, `Checking Credentials ..`)));

    sendToIpcMain(
      IPCRequestObject(`auth-login`, {
        username: formData?.username,
        password: formData?.password,
      })
    );
  };

  return (
    <div>
      <Form
        id="form-login"
        method="POST"
        elements={formElements}
        submitAction={formSubmitAction}
      />
    </div>
  );
};

export default Login;

/**
 * Login.tsx
 *
 * Description:
 *    Login Component.
 *
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { IPCRequestObject } from '../../../common/util';
import { updateMessageState } from '../../State/reducer';
import { sendToIpcMain } from '../../util';
import Form from '../Elements/Form';

const Login = () => {
  const dispatch = useDispatch();

  // Form Fields.
  const form: LoginFormType = {
    username: '',
    password: '',
  };

  // Input Element Attributes.
  const InputElementData = [
    {
      type: 'text',
      label: 'Username',
      name: 'username',
      placeholder: 'Username',
      required: true,
    },
    {
      type: 'password',
      label: 'Password',
      name: 'password',
      placeholder: 'Password',
      required: true,
    },
  ];

  /**
   * Submit User Registration form.
   *
   * @param event Event
   */
  const onFormSubmit = (formData: FormType): void => {
    dispatch(updateMessageState(0, `Checking Credentials ..`));

    sendToIpcMain(
      IPCRequestObject(`auth-login`, {
        username: formData?.username,
        password: formData?.password,
      })
    );
  };

  return (
    <Form
      method="POST"
      formFields={form}
      inputElements={InputElementData}
      submitAction={onFormSubmit}
    />
  );
};

export default Login;

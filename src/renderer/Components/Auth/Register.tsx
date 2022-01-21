/**
 * Register.tsx
 *
 * Description:
 *    Register Component.
 *
 */

import React from 'react';
import { createMessage, IPCRequestObject } from '../../../common/util';
import { useAppDispatch } from '../../Hooks';
import { setMessageState } from '../../State/reducer';
import { sendToIpcMain } from '../../util';
import Form from '../Elements/Form';

const Register = () => {
  const dispatch = useAppDispatch();

  // Register Form Elements.
  const formElements: FormElementsInterface = {
    input: [
      {
        id: 'register-username',
        name: 'username',
        type: 'text',
        label: 'Username',
        placeholder: 'Username',
        required: true,
        value: '',
      },
      {
        id: 'register-password',
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Password',
        required: true,
        value: '',
      },
      {
        id: 'register-retypePassword',
        name: 'retypePassword',
        type: 'password',
        label: 'Retype Password',
        placeholder: 'Retype Password',
        required: true,
        value: '',
      },
    ],
    button: [
      {
        id: 'register',
        label: 'Register',
      },
    ],
  };

  /**
   * Submit Registration form.
   *
   * @param formData Form fields value.
   */
  const formSubmitAction = (formData: Record<string, unknown>): void => {
    if (formData?.password === formData?.retypePassword) {
      dispatch(setMessageState(createMessage(0, `Registering User...`)));

      sendToIpcMain(
        IPCRequestObject(`auth-register`, {
          username: formData?.username,
          password: formData?.password,
        })
      );
    } else {
      // Passored & Retype Password Mismatch.
      dispatch(setMessageState(createMessage(-1, `Password Mismatch.`)));
    }
  };

  return (
    <div>
      <Form
        id="form-register"
        method="POST"
        elements={formElements}
        submitAction={formSubmitAction}
      />
    </div>
  );
};

export default Register;

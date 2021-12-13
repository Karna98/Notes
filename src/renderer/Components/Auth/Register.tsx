/**
 * Register.tsx
 *
 * Description:
 *    Register Component.
 *
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { updateMessageState } from '../../State/reducer';
import { IPCRequestObject } from '../../../common/util';
import { sendToIpcMain } from '../../util';
import Form from '../Elements/Form';

const Register = () => {
  const dispatch = useDispatch();

  // Form Fields.
  const form: RegisterFormType = {
    username: '',
    password: '',
    retypePassword: '',
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
    {
      type: 'password',
      label: 'Retype Password',
      name: 'retypePassword',
      placeholder: 'Retype Password',
      required: true,
    },
  ];

  /**
   * Submit User Registration form.
   *
   * @param event Event
   */
  const onFormSubmit = (formData: RegisterFormType): void => {
    if (formData?.password === formData?.retypePassword) {
      dispatch(updateMessageState(0, `Registering User...`));

      sendToIpcMain(
        IPCRequestObject(`auth-register`, {
          username: formData?.username,
          password: formData?.password,
        })
      );
    } else {
      // Passored & Retype Password Mismatch.
      dispatch(updateMessageState(-1, `Password Mismatch.`));
    }
  };

  return (
    <div>
      <Form
        method="POST"
        formFields={form}
        inputElements={InputElementData}
        submitAction={onFormSubmit}
      />
    </div>
  );
};

export default Register;

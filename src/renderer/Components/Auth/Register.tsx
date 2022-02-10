/**
 * Register.tsx
 *
 * Description:
 *    Register Component.
 *
 */

import { createMessage, IPCRequestObject } from 'common';
import { Form } from 'renderer/Components';
import { useAppDispatch } from 'renderer/Hooks';
import { setMessageState } from 'renderer/State';
import { sendToIpcMain } from 'renderer/util';

const Register = () => {
  const dispatch = useAppDispatch();

  /**
   * Submit Registration form.
   *
   * @param formData Form fields value.
   */
  const formSubmitAction = (formData: Record<string, unknown>): void => {
    if (formData?.password === formData?.retype_password) {
      delete formData[`retype_password`];

      dispatch(setMessageState(createMessage(0, `Registering User...`)));
      sendToIpcMain(IPCRequestObject(`auth-register`, formData));
    } else {
      // Passored & Retype Password Mismatch.
      dispatch(setMessageState(createMessage(-1, `Password Mismatch.`)));
    }
  };

  return (
    <div className="auth-card">
      <Form id="auth-form-register" submitAction={formSubmitAction} />
    </div>
  );
};

export default Register;

/**
 * Register.tsx
 *
 * Description:
 *    Register Component.
 *
 */

import { CONSTANT, createMessage, IPCRequestObject } from 'common';
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
  const formSubmitAction = (formData?: Record<string, unknown>): void => {
    if (formData && formData?.password === formData?.retype_password) {
      delete formData[`retype_password`];

      dispatch(
        setMessageState(createMessage(`progress`, `Registering User...`))
      );
      sendToIpcMain(IPCRequestObject(CONSTANT.ROUTE.AUTH.REGISTER, formData));
    } else {
      // Passored & Retype Password Mismatch.
      dispatch(
        setMessageState(createMessage(`client-error`, `Password Mismatch.`))
      );
    }
  };

  return <Form id="auth-form-register" submitAction={formSubmitAction} />;
};

export default Register;

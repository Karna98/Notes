/**
 * Login.tsx
 *
 * Description:
 *    Login Component.
 *
 */

import { createMessage, IPCRequestObject } from 'common';
import { Form } from 'renderer/Components';
import { useAppDispatch } from 'renderer/Hooks';
import { setMessageState } from 'renderer/State';
import { sendToIpcMain } from 'renderer/util';

const Login = () => {
  const dispatch = useAppDispatch();

  /**
   * Submit Login form.
   *
   * @param formData Form fields value
   */
  const formSubmitAction = (formData?: Record<string, unknown>): void => {
    dispatch(setMessageState(createMessage(0, `Checking Credentials ..`)));
    sendToIpcMain(IPCRequestObject(`auth-login`, formData));
  };

  return (
    <div className="auth-card">
      <Form id="auth-form-login" submitAction={formSubmitAction} />
    </div>
  );
};

export default Login;

/**
 * Login.tsx
 *
 * Description:
 *    Login Component.
 *
 */

import { CONSTANT, createMessage } from 'common';
import { Form } from 'renderer/Components';
import { useAppDispatch } from 'renderer/Hooks';
import { setMessageState } from 'renderer/State';
import { sendToMainWrapper } from 'renderer/util';

const Login = () => {
  const dispatch = useAppDispatch();

  /**
   * Submit Login form.
   *
   * @param formData Form fields value
   */
  const formSubmitAction = (formData?: Record<string, unknown>): void => {
    dispatch(
      setMessageState(createMessage(`progress`, `Checking Credentials ..`))
    );

    sendToMainWrapper(CONSTANT.ROUTE.AUTH.LOGIN, formData);
  };

  return <Form id="auth-form-login" submitAction={formSubmitAction} />;
};

export default Login;

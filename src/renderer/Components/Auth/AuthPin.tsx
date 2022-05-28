/**
 * AuthPin.tsx
 *
 * Description:
 *    Auth Pin Component.
 *
 */

import { CONSTANT, createMessage, IPCRequestObject } from 'common';
import { Form } from 'renderer/Components';
import { useAppDispatch, useAppSelector } from 'renderer/Hooks';
import { setMessageState } from 'renderer/State';
import { sendToIpcMain } from 'renderer/util';

const BASE_IDENTIFIER = `auth-pin`;

const FORM_SETUP = BASE_IDENTIFIER + `-` + `form-setup`;
const FORM_VERIFY = BASE_IDENTIFIER + `-` + `form-verify`;

const AuthPin = () => {
  const dispatch = useAppDispatch();

  // Get session value stored in Redux Store.
  const sessionState = useAppSelector((state) => state.session);

  /**
   * Submit Auth PIN form.
   *
   * @param formData Form fields value
   */
  const formSubmitAction = (formData?: Record<string, unknown>): void => {
    dispatch(setMessageState(createMessage(`progress`, `Verifying PIN ..`)));

    sendToIpcMain(
      IPCRequestObject(CONSTANT.ROUTE.AUTH_PIN.LOGIN, {
        ...sessionState,
        l_pin: formData?.pin,
      })
    );
  };

  return (
    <Form
      id={sessionState?.lPinStatus ? FORM_VERIFY : FORM_SETUP}
      submitAction={formSubmitAction}
    />
  );
};

export default AuthPin;

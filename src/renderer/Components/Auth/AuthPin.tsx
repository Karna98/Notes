/**
 * AuthPin.tsx
 *
 * Description:
 *    Auth Pin Component.
 *
 */

import { createMessage, IPCRequestObject } from 'common';
import { Form } from 'renderer/Components';
import { useAppDispatch } from 'renderer/Hooks';
import { setMessageState } from 'renderer/State';
import { sendToIpcMain } from 'renderer/util';

const BASE_IDENTIFIER = `auth-pin`;

const FORM_SETUP = BASE_IDENTIFIER + `-` + `form-setup`;
const FORM_VERIFY = BASE_IDENTIFIER + `-` + `form-verify`;

const AuthPin = () => {
  const dispatch = useAppDispatch();

  // If PIN is already set.
  const pinSetupStatus = false;

  /**
   * Submit Auth PIN form.
   *
   * @param formData Form fields value
   */
  const formSubmitAction = (formData?: Record<string, unknown>): void => {
    dispatch(setMessageState(createMessage(`progress`, `Verifying PIN ..`)));

    // @TODO : Write Backend Functionality.
    console.log(formData);
    false && sendToIpcMain(IPCRequestObject(`auth-pin-login`, formData));
  };

  return (
    <Form
      id={pinSetupStatus ? FORM_VERIFY : FORM_SETUP}
      submitAction={formSubmitAction}
    />
  );
};

export default AuthPin;

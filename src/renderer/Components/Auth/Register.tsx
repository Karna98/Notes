/**
 * Register.tsx
 *
 * Description:
 *    Register Component.
 *
 */

import { CONSTANT, createMessage } from 'common';
import { Form } from 'renderer/Components';
import { useAppDispatch } from 'renderer/Hooks';
import { setMessageState } from 'renderer/State';
import { sendToMainWrapper } from 'renderer/util';

// Constant String.
const { IPC, MSG_CODE } = CONSTANT;

// Constant Message String.
const MSG_STR = {
  PASS_MISMATCH: `Password Mismatch !`,
  REG_IN_PROGRESS: `Registering User ...`,
};

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
        setMessageState(
          createMessage(MSG_CODE.PROGRESS, MSG_STR.REG_IN_PROGRESS)
        )
      );

      sendToMainWrapper(IPC.ROUTE.AUTH.REGISTER, formData);
    } else {
      // Passored & Retype Password Mismatch.
      dispatch(
        setMessageState(
          createMessage(CONSTANT.MSG_CODE.ERR_CLIENT, MSG_STR.PASS_MISMATCH)
        )
      );
    }
  };

  return <Form id="auth-form-register" submitAction={formSubmitAction} />;
};

export default Register;

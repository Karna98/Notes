/**
 * AuthPinForm.tsx
 *
 * Description:
 *    Auth PIN Form.
 *
 */

import { useEffect, useRef, useState } from 'react';
import { Button, Input } from '..';

const PIN_LENGTH = 4;
const BACKSPACE_KEY = `Backspace`;

const BASE_IDENTIFIER = `auth-pin-form`;

const FORM_TYPE_SETUP = BASE_IDENTIFIER + `-` + `setup`;
const FORM_TYPE_VERIFY = BASE_IDENTIFIER + `-` + `verify`;

const getElementBasicAttributes = (elementName: string) => {
  return {
    id: BASE_IDENTIFIER + `-` + elementName,
    name: elementName,
  };
};

// Form Elements
const formElements: {
  inputs: InputInterface[];
  buttons: Record<string, ButtonInterface>;
} = {
  inputs: [],
  buttons: {
    submit: {
      ...getElementBasicAttributes(`button-submit`),
      label: `Submit`,
    },
    verify: {
      ...getElementBasicAttributes(`button-verify`),
      label: `Verify`,
    },
  },
};

const pinInputElement = (identifier: number) => ({
  ...getElementBasicAttributes(`input-${identifier}`),
  placeholder: `*`,
  type: 'password',
  required: true,
  maxLength: 1,
});

// Populate PIN Input.
for (let i = 0; i < PIN_LENGTH; i++) {
  formElements.inputs.push(pinInputElement(i + 1));
}

const AuthPinForm: React.FC<FormInterface> = ({ id, submitAction }) => {
  // Form Type
  const [formType, setFormType] = useState(id);

  // Form PIN Input Value.
  const [formValue, setFormValue] = useState(new Array(PIN_LENGTH).fill(``));

  // Button disabled status.
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Form Input's Reference
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Setup PIN Value.
  const [pinValue, setPinValue] = useState('');

  /**
   * Update PIN Form input value.
   *
   * @param value New value.
   * @param index Index of PIN Input to be updated.
   */
  const onPinChange = (value: string, index: number) => {
    const updatedValue = [...formValue];
    updatedValue[index] = value;
    setFormValue(updatedValue);

    const tempPin = updatedValue.join('');
    // Check if tempPin is equal to PIN length.
    const isTempPinFull = tempPin.length == PIN_LENGTH;

    // Update 'Submit' or 'Verify' Button Disable status.
    formType === FORM_TYPE_VERIFY && pinValue !== ``
      ? setButtonDisabled(!(pinValue === tempPin && isTempPinFull))
      : setButtonDisabled(!isTempPinFull);
  };

  /**
   * Update focus to required Input Index.
   *
   * @param index Index of PIN Input to be focused
   */
  const changePinFocus = (index: number) => {
    const ref = inputRefs.current[index];
    ref && ref.focus();
  };

  /**
   * Handle Form Input changes.
   *
   * @param event
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    onPinChange(event.target.value, index);

    if (event.target.value.length == 0) return;

    if (index < PIN_LENGTH - 1) changePinFocus(index + 1);
  };

  /**
   * When PIN Input Element is active and key is pressed.
   *
   * @param event KeyBoard Event
   * @param index Index of currently active PIN Input.
   */
  const onKeyDownFunction = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.nativeEvent.code != BACKSPACE_KEY) return;

    formValue[index] === ``
      ? changePinFocus(index - 1)
      : onPinChange(``, index);
  };

  /**
   * Executes the Submit Action on Form Submit.
   *
   * @param event
   */
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formType === FORM_TYPE_VERIFY)
      submitAction({ pin: formValue.join(``) });
    else {
      setPinValue(formValue.join(''));
      setFormValue(new Array(PIN_LENGTH).fill(``));
      setButtonDisabled(true);
      setFormType(FORM_TYPE_VERIFY);
      changePinFocus(0);
    }
  };

  useEffect(() => {
    // Always focus on 1st PIN Input when rendered.
    changePinFocus(0);
  }, []);

  return (
    <form id={id} method="POST" onSubmit={submitForm}>
      <div className="d-flex flex-row justify-content-evenly align-items-center form-title">
        <h4>{formType === FORM_TYPE_SETUP ? `SETUP PIN` : `VERIFY PIN`}</h4>
      </div>

      <div className="d-flex flex-row justify-content-evenly align-items-center form-inputs">
        {formElements.inputs.map(
          (elementObject: InputInterface, index: number) => (
            <Input
              key={elementObject.id}
              {...elementObject}
              onChange={(event) => handleInputChange(event, index)}
              onKeyDown={(event) => onKeyDownFunction(event, index)}
              ref={(inputELement: HTMLInputElement) => {
                inputRefs.current[index] = inputELement;
              }}
              value={formValue[index]}
            />
          )
        )}
      </div>

      <div className="d-flex flex-row justify-content-evenly align-items-center form-button">
        <Button
          {...(formType === FORM_TYPE_SETUP
            ? formElements.buttons.submit
            : formElements.buttons.verify)}
          disabled={buttonDisabled}
          className="button-type-3"
        />
      </div>
    </form>
  );
};

export default AuthPinForm;

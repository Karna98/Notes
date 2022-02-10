/**
 * LoginForm.tsx
 *
 * Description:
 *    Login Form.
 *
 */

import { useState } from 'react';
import { Button, Input } from '..';

const getElementBasicAttributes = (elementName: string) => {
  return {
    id: `auth-${elementName}`,
    name: elementName,
  };
};
const defaultFormInputs: InputInterface[] = [
  {
    ...getElementBasicAttributes(`username`),
    placeholder: `Username`,
    required: true,
    value: ``,
  },
  {
    ...getElementBasicAttributes(`password`),
    placeholder: `Password`,
    type: `password`,
    required: true,
    value: ``,
  },
  {
    ...getElementBasicAttributes(`retype_password`),
    placeholder: `Retype Password`,
    required: true,
    type: `password`,
    value: ``,
  },
];

const formButtons: Record<string, ButtonInterface> = {
  register: {
    ...getElementBasicAttributes(`button-register`),
    label: `Register`,
    disabled: true,
  },
  login: {
    ...getElementBasicAttributes(`button-login`),
    label: `Login`,
    disabled: true,
  },
};

const AuthForm: React.FC<Pick<FormInterface, `id` | `submitAction`>> = ({
  id,
  submitAction,
}) => {
  // Default input value for Form Elements.
  const defaultFormValues: Record<string, string> = {
    username: ``,
    password: ``,
  };

  if (id === `auth-form-register`) defaultFormValues[`retype_password`] = ``;

  // Form Elements Value.
  const [formElementsValue, setFormElementsValue] = useState(defaultFormValues);
  // Login/Register button disabled status.
  const [buttonDisabled, setButtonDisabled] = useState(true);

  /**
   * Handle Form Input changes.
   *
   * @param event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updateFormValues = {
      ...formElementsValue,
      [event.target.name]: event.target.value,
    };
    setFormElementsValue(updateFormValues);

    setButtonDisabled(
      Object.values(updateFormValues).some(
        (elementValue) => elementValue === ''
      )
    );
  };

  /**
   * Executes the Submit Action on Form Submit.
   *
   * @param event
   */
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    submitAction(formElementsValue);
  };

  return (
    <form
      id={id}
      method="POST"
      onSubmit={submitForm}
      className="d-flex flex-column justify-content-evenly align-items-center"
    >
      <div className="d-flex flex-column justify-content-evenly align-items-center form-inputs">
        {defaultFormInputs.map(
          (elementObject: InputInterface) =>
            (elementObject.name !== `retype_password` ||
              id === `auth-form-register`) && (
              <Input
                key={elementObject.id}
                {...elementObject}
                value={formElementsValue[elementObject.name]}
                onChange={handleInputChange}
              />
            )
        )}
      </div>

      <div className="d-flex flex-row justify-content-evenly align-items-center form-button">
        <Button
          {...formButtons[id === `auth-form-register` ? `register` : `login`]}
          disabled={buttonDisabled}
        />
      </div>
    </form>
  );
};

export default AuthForm;

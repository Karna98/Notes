/**
 * SpaceForm.tsx
 *
 * Description:
 *    Space Form.
 *
 */

import { useState } from 'react';
import { Button, Input } from '..';

const getElementBasicAttributes = (elementName: string) => {
  return {
    id: `spaces-${elementName}`,
    name: elementName,
  };
};

const defaultFormInputs: InputInterface[] = [
  {
    ...getElementBasicAttributes(`space_name`),
    placeholder: `New Space Name`,
    required: true,
    value: ``,
  },
];

const formButtons: Record<string, ButtonInterface> = {
  add: {
    ...getElementBasicAttributes(`button-add`),
    label: `Add`,
    disabled: true,
  },
};

const SpaceForm: React.FC<FormInterface> = ({ id, submitAction }) => {
  // Default input value for Form Elements.
  const defaultFormValues: Record<string, string> = {
    space_name: ``,
  };

  // Form Elements Value.
  const [formElementsValue, setFormElementsValue] = useState(defaultFormValues);
  // Add button disabled status.
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
        (elementValue) => elementValue === ``
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

    // Reset Form Field Values.
    setFormElementsValue(defaultFormValues);
    setButtonDisabled(true);
  };

  return (
    <form
      id={id}
      method="POST"
      onSubmit={submitForm}
      className="d-flex flex-column justify-content-evenly align-items-center"
    >
      <div className="d-flex flex-column justify-content-evenly align-items-center form-inputs">
        {defaultFormInputs.map((elementObject: InputInterface) => (
          <Input
            key={elementObject.id}
            {...elementObject}
            value={formElementsValue[elementObject.name]}
            onChange={handleInputChange}
          />
        ))}
      </div>

      <div className="d-flex flex-row justify-content-evenly align-items-center form-button">
        <Button
          {...formButtons.add}
          disabled={buttonDisabled}
          className="button-type-3"
        />
      </div>
    </form>
  );
};

export default SpaceForm;

/**
 * NoteForm.tsx
 *
 * Description:
 *    Note Form.
 *
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextArea } from '..';

const getElementBasicAttributes = (elementName: string) => {
  return {
    id: `note-${elementName}`,
    name: elementName,
  };
};

const defaultFormInputs: TextAreaInputInterface = {
  ...getElementBasicAttributes(`note`),
  placeholder: `Lets Note it down ...`,
  value: ``,
};

const formButtons: Record<string, ButtonInterface> = {
  save: {
    ...getElementBasicAttributes(`button-save`),
    label: `Save`,
    type: `submit`,
  },
  close: {
    ...getElementBasicAttributes(`button-close`),
    label: `Close Note`,
    type: `button`,
  },
};

const NoteForm: React.FC<FormInterface> = ({
  id,
  submitAction,
  formValues,
}) => {
  const navigate = useNavigate();

  // Default input value for Form Elements.
  const defaultFormValues: Record<string, string | number> = {
    note: ``,
    ...formValues,
  };

  // Form Elements Value.
  const [formElementsValue, setFormElementsValue] = useState(defaultFormValues);
  // Save button disabled status.
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  /**
   * Handle Form Input changes.
   *
   * @param event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedForm = {
      ...formElementsValue,
      [event.target.name]: event.target.value,
      updated_at: Date.now(),
    };

    setFormElementsValue(updatedForm);

    setSaveButtonDisabled(
      (updatedForm.note as string).trim().length === 0 ||
        updatedForm.note === defaultFormValues.note
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

    setSaveButtonDisabled(true);

    if (id === `note-form-add`)
      // Reset Form Field Values.
      setFormElementsValue(defaultFormValues);
  };

  return (
    <form
      id={id}
      method="POST"
      onSubmit={submitForm}
      className="d-flex flex-column justify-content-evenly"
    >
      <div className="d-flex flex-column justify-content-evenly align-items-center form-inputs">
        <TextArea
          {...defaultFormInputs}
          value={formElementsValue[defaultFormInputs.name]}
          onChange={handleInputChange}
        />
      </div>

      {id === `note-form-update` && formValues?.updated_at && (
        <sub>
          <b>Updated at </b>
          {new Date(formValues?.updated_at as number).toLocaleString(`en-IN`, {
            hourCycle: `h23`,
          })}
        </sub>
      )}

      <div className="d-flex flex-row justify-content-evenly align-items-center form-button">
        {id === `note-form-update` && (
          <Button {...formButtons.close} onClick={() => navigate(-1)} />
        )}

        <Button {...formButtons.save} disabled={saveButtonDisabled} />
      </div>
    </form>
  );
};

export default NoteForm;

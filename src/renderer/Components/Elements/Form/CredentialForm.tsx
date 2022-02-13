/**
 * CredentialForm.tsx
 *
 * Description:
 *    Credential Form.
 *
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, TextArea } from '..';

const getElementBasicAttributes = (elementName: string) => {
  return {
    id: `credential-${elementName}`,
    name: elementName,
  };
};

const defaultFormInputs: (InputInterface | TextAreaInputInterface)[] = [
  {
    ...getElementBasicAttributes('title'),
    placeholder: 'Title or Website name',
    required: true,
    value: '',
  },
  {
    ...getElementBasicAttributes('description'),
    placeholder: 'Description',
    value: '',
  },
];

const addFieldInput: InputInterface = {
  ...getElementBasicAttributes('newField'),
  placeholder: 'New Field',
  value: '',
};

const formButtons: Record<string, ButtonInterface> = {
  save: {
    ...getElementBasicAttributes('button-save'),
    label: 'Save',
    type: 'submit',
    disabled: true,
  },
  add: {
    ...getElementBasicAttributes('button-add'),
    label: 'Add',
    type: 'button',
  },
  close: {
    ...getElementBasicAttributes(`button-close`),
    label: `Close`,
    type: `button`,
  },
};

const CredentialForm: React.FC<FormInterface> = ({
  id,
  submitAction,
  formValues,
}) => {
  const navigate = useNavigate();

  // Default input value for Form Elements.
  const defaultFormValues: Record<string, string> = {
    title: '',
    description: '',
    newField: '',
    ...formValues,
  };

  // Form Elements List.
  const [formElementsState, setFormElementsState] = useState(defaultFormInputs);
  // Form Elements Value.
  const [formElementsValue, setFormElementsValue] = useState(defaultFormValues);
  // Add Field button disabled status.
  const [addFieldButtonDisabled, setAddFieldButtonDisabled] = useState(true);
  // Save button disabled status.
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  /**
   * Handle Form Input changes.
   *
   * @param event
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedForm = {
      ...formElementsValue,
      [event.target.name]: event.target.value,
    };

    // Enable 'Add' Button when input is empty or field with same name already present.
    event.target.name === addFieldInput.name &&
      setAddFieldButtonDisabled(
        // Empty Input.
        updatedForm.newField.trim().length == 0 ||
          // Field Name already exists.
          Object.prototype.hasOwnProperty.call(
            formElementsValue,
            event.target.value
          )
      );

    setFormElementsValue(updatedForm);
    setSaveButtonDisabled(updatedForm.title === ``);
  };

  const createNewInputElement = (
    name: string,
    value?: string
  ): InputInterface => ({
    ...getElementBasicAttributes(name),
    type: 'text',
    label: name,
    placeholder: name,
    value: value === undefined ? '' : value,
  });

  const handleOnClick = () => {
    const newFieldName = formElementsValue.newField;

    const updatedFormElementsValue: typeof defaultFormValues = {
      ...formElementsValue,
      newField: '',
    };

    // Add new entry to 'formElementsValue' object.
    updatedFormElementsValue[newFieldName] = '';

    setFormElementsState([
      ...formElementsState,
      createNewInputElement(newFieldName),
    ]);

    setFormElementsValue(updatedFormElementsValue);

    setAddFieldButtonDisabled(true);
  };

  /**
   * Executes the Submit Action on Form Submit.
   *
   * @param event
   */
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    const finalformValues: {
      title: string;
      secure: Record<string, unknown>[];
    } = {
      title: formElementsValue.title,
      secure: [],
    };

    formElementsState.map(
      (formElement: InputInterface | TextAreaInputInterface) => {
        if (formElement !== undefined && formElement.name !== `title`) {
          finalformValues.secure.push({
            name: formElement.name,
            value: formElementsValue[formElement.name as string],
          });
        }
      }
    );

    submitAction(finalformValues);

    // Reset Form Field Values.
    setFormElementsState(defaultFormInputs);
    setFormElementsValue(defaultFormValues);
  };

  useEffect(() => {
    if (formValues !== undefined) {
      const secureCredentialList = [];

      for (const key in formValues) {
        if (!(key === `title` || key === `description`)) {
          secureCredentialList.push(
            createNewInputElement(key, formValues[key] as string)
          );
        }
      }

      setFormElementsState([...formElementsState, ...secureCredentialList]);
    }
  }, []);

  return (
    <form
      id={id}
      method="POST"
      onSubmit={submitForm}
      className="d-flex flex-column justify-content-between"
    >
      <div className="d-flex flex-column align-items-center form-inputs">
        {formElementsState.map(
          (elementObject: InputInterface | TextAreaInputInterface) =>
            elementObject.name !== `updated_at` &&
            (elementObject.name === 'description' ? (
              <TextArea
                key={elementObject.id}
                {...elementObject}
                value={formElementsValue[elementObject.name]}
                onChange={handleInputChange}
              />
            ) : (
              <Input
                key={elementObject.id}
                {...elementObject}
                value={formElementsValue[elementObject.name]}
                onChange={handleInputChange}
              />
            ))
        )}
      </div>

      {id === `credential-form-update` && formValues?.updated_at && (
        <sub>
          <b>Updated at </b>
          {new Date(formValues?.updated_at as number).toLocaleString(`en-IN`, {
            hourCycle: `h23`,
          })}
        </sub>
      )}

      <div>
        <div className="d-flex flex-row justify-content-evenly align-items-center form-dynamic-inputs">
          <Input
            {...addFieldInput}
            value={formElementsValue[addFieldInput.name]}
            onChange={handleInputChange}
          />

          <Button
            {...formButtons['add']}
            onClick={handleOnClick}
            disabled={addFieldButtonDisabled}
          />
        </div>

        <div className="d-flex flex-row justify-content-evenly align-items-center form-button">
          {id === `credential-form-update` && (
            <Button {...formButtons.close} onClick={() => navigate(-1)} />
          )}

          <Button {...formButtons['save']} disabled={saveButtonDisabled} />
        </div>
      </div>
    </form>
  );
};

export default CredentialForm;

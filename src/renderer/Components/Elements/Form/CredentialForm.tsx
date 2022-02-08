/**
 * CredentialForm.tsx
 *
 * Description:
 *    Credential Form.
 *
 */

import React, { useEffect, useState } from 'react';
import { Button, Input, TextArea } from '..';

type InputsInterface = InputInterface | TextAreaInputInterface;

const getElementBasicAttributes = (elementName: string) => {
  return {
    id: `credential-${elementName}`,
    name: elementName,
  };
};

const defaultFormInputs: InputsInterface[] = [
  {
    ...getElementBasicAttributes('title'),
    label: 'Title',
    placeholder: 'Title or Website name',
    required: true,
    value: '',
  },
  {
    ...getElementBasicAttributes('description'),
    label: 'Description',
    placeholder: 'Description',
    value: '',
  },
];

const addFieldInput: InputInterface = {
  ...getElementBasicAttributes('newField'),
  label: '',
  placeholder: 'New Field',
  value: '',
};

const formButtons: Record<string, ButtonInterface> = {
  save: {
    ...getElementBasicAttributes('button-save'),
    label: 'Save',
    type: 'submit',
  },
  add: {
    ...getElementBasicAttributes('button-add'),
    label: 'Add Field',
    type: 'button',
  },
};

const CredentialForm: React.FC<
  Pick<FormInterface, 'id' | 'submitAction' | 'formValues'>
> = ({ id, submitAction, formValues }) => {
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
  };

  const createNewInputElement = (
    name: string,
    value?: string
  ): InputInterface => {
    return {
      ...getElementBasicAttributes(name),
      type: 'text',
      label: name,
      placeholder: name,
      value: value === undefined ? '' : value,
    };
  };

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

    formElementsState.map((formElement: InputsInterface | ButtonInterface) => {
      if (formElement !== undefined && formElement.name !== `title`) {
        finalformValues.secure.push({
          name: formElement.name,
          value: formElementsValue[formElement.name as string],
        });
      }
    });

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
      method="POST"
      onSubmit={submitForm}
      className="d-flex flex-column align-items-center justify-content-evenly"
    >
      {formElementsState.map(
        (elementObject: InputInterface | TextAreaInputInterface) => (
          <div key={elementObject.id}>
            {elementObject.name === 'description' ? (
              <TextArea
                {...elementObject}
                value={formElementsValue[elementObject.name]}
                onChange={handleInputChange}
              />
            ) : (
              <Input
                {...elementObject}
                value={formElementsValue[elementObject.name]}
                onChange={handleInputChange}
              />
            )}
          </div>
        )
      )}

      {/* Temporary hides Form edit for Update.*/}
      {id === `form-credential-add` && (
        <>
          <div className="d-flex flex-row align-items-center justify-content-evenly">
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
          <div className="d-flex flex-row justify-content-evenly">
            <Button {...formButtons['save']} />
          </div>
        </>
      )}
    </form>
  );
};

export default CredentialForm;

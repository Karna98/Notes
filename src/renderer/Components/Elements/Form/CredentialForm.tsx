/**
 * CredentialForm.tsx
 *
 * Description:
 *    Credential Form.
 *
 */

import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import TextArea from '../TextArea';

type formFieldsType = Record<
  string,
  string | number | readonly string[] | undefined
>;

type InputsInterface = InputInterface | TextAreaInputInterface;

const getBasicAttributes = (elementName: string) => {
  return {
    id: `credential-${elementName}`,
    name: `${elementName}`,
  };
};

const formElements: ElementType<InputsInterface>[] = [
  {
    element: 'input',
    attributes: {
      ...getBasicAttributes('title'),
      label: `Title`,
      placeholder: 'Title or Website name',
      required: true,
      value: '',
    },
  },
  {
    element: 'textarea',
    attributes: {
      ...getBasicAttributes('description'),
      label: `Note`,
      placeholder: 'Description',
      value: '',
    },
  },
];

const addSecureFieldInput: ElementType<InputInterface> = {
  element: 'input',
  attributes: {
    ...getBasicAttributes('newSecureField'),
    placeholder: 'New Field',
    value: '',
  },
};

const formButtons: Record<string, ButtonInterface> = {
  save: {
    ...getBasicAttributes('saveButton'),
    label: 'Save',
    type: 'submit',
  },
  add: {
    ...getBasicAttributes('addButton'),
    label: 'Add Field',
    type: 'button',
    disabled: true,
  },
};

const formFields: formFieldsType = {};

formElements.map((elementObject: ElementType<InputsInterface>) => {
  formFields[elementObject.attributes.name] = elementObject.attributes?.value;
});

formFields[addSecureFieldInput.attributes.name] = '';

const getElement = (
  type: string,
  attributes: InputsInterface | ButtonInterface,
  elementValue?: string | number | readonly string[] | undefined,
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | (() => void)
) => {
  switch (type) {
    case 'input':
      attributes = attributes as InputInterface;
      return (
        <div className="d-flex flex-row">
          <Input
            key={attributes.name}
            {...attributes}
            value={elementValue}
            onChange={onChange}
          />
        </div>
      );
    case 'textarea':
      return (
        <div className="d-flex flex-row">
          <TextArea
            key={attributes.name as string}
            {...(attributes as TextAreaInputInterface)}
            value={elementValue as string}
            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          />
        </div>
      );
    case 'button':
      attributes = attributes as ButtonInterface;
      return (
        <Button
          key={attributes.id}
          {...attributes}
          onClick={onChange as () => void}
        />
      );
  }
  return;
};

const checkIfKeyExists = (key: string, object: Record<string, unknown>) => {
  return object[key] === undefined ? false : true;
};

const CredentialForm: React.FC<Pick<FormInterface, 'submitAction'>> = (
  props
) => {
  const { submitAction } = props;
  // Form Elements.
  const [formElementsState, setFormElementsState] = useState(formElements);
  // Foem Elements Value.
  const [formElementsValue, setFormElementsValue] = useState(formFields);
  // Add new fields button.
  const [addFieldButton, setAddFieldButton] = useState(formButtons.add);

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
    event.target.name === addSecureFieldInput.attributes.name &&
      setAddFieldButton({
        ...addFieldButton,
        disabled:
          !checkIfKeyExists(event.target.value, formElementsValue) &&
          (updatedForm[addSecureFieldInput.attributes.name] as string).trim()
            .length != 0
            ? false
            : true,
      });

    setFormElementsValue(updatedForm);
  };

  const handleOnClick = () => {
    const newInputElementName = `${
      formElementsValue[addSecureFieldInput.attributes.name]
    }`;

    const newInputElement: ElementType<InputInterface> = {
      element: 'input',
      attributes: {
        ...getBasicAttributes(`${newInputElementName}`),
        type: 'text',
        label: `${newInputElementName}`,
        placeholder: `${newInputElementName}`,
        value: '',
      },
    };

    const updatedFormElementsValue = { ...formElementsValue };

    updatedFormElementsValue[newInputElement.attributes.name] = '';
    updatedFormElementsValue[addSecureFieldInput.attributes.name] = '';

    setFormElementsState([...formElementsState, newInputElement]);

    setFormElementsValue(updatedFormElementsValue);

    setAddFieldButton({
      ...addFieldButton,
      disabled: true,
    });
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
      title: formElementsValue['title'] as string,
      secure: [],
    };

    formElementsState.map(
      (formElement: ElementType<InputsInterface | ButtonInterface>) => {
        if (
          formElement.attributes !== undefined &&
          formElement.attributes.name !== `title`
        ) {
          finalformValues.secure.push({
            name: formElement.attributes.name,
            value: formElementsValue[formElement.attributes.name as string],
            element: formElement.element,
          });
        }
      }
    );

    submitAction(finalformValues);

    // Reset Form Field Values.
    setFormElementsState(formElements);
    setFormElementsValue(formFields);
  };

  return (
    <form
      method="POST"
      onSubmit={submitForm}
      className="d-flex flex-column align-items-center justify-content-evenly"
    >
      {formElementsState.map(
        (
          elementObject: ElementType<InputInterface | TextAreaInputInterface>
        ) => (
          <div key={elementObject.attributes.id}>
            {getElement(
              elementObject.element,
              elementObject.attributes,
              formElementsValue[elementObject.attributes.name],
              handleInputChange
            )}
          </div>
        )
      )}

      <div className="d-flex flex-row align-items-center justify-content-evenly">
        {getElement(
          addSecureFieldInput.element,
          addSecureFieldInput.attributes,
          formElementsValue[addSecureFieldInput.attributes.name],
          handleInputChange
        )}
        {
          getElement(
            'button',
            addFieldButton,
            '',
            handleOnClick
          ) as unknown as ButtonInterface
        }
      </div>
      <div className="d-flex flex-row justify-content-evenly">
        {getElement('button', formButtons['save'])}
      </div>
    </form>
  );
};

export default CredentialForm;

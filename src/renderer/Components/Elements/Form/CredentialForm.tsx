/**
 * CredentialForm.tsx
 *
 * Description:
 *    Credential Form.
 *
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, TextArea } from '..';

/**
 * Returns an object with 'id' and 'name'.
 *
 * @param elementName
 * @returns {object} Object of 'id' and 'name'.
 */
const getElementBasicAttributes = (elementName: string) => ({
  id: `credential-${elementName}`,
  name: elementName,
});

// Form Elements
const formElements: {
  defaultInput: [InputInterface, TextAreaInputInterface];
  newFieldInput: InputInterface;
  buttons: Record<string, ButtonInterface>;
} = {
  defaultInput: [
    {
      ...getElementBasicAttributes(`title`),
      placeholder: `Title or Website name`,
      required: true,
      value: ``,
    },
    {
      ...getElementBasicAttributes(`description`),
      placeholder: `Description`,
      value: ``,
    },
  ],

  newFieldInput: {
    ...getElementBasicAttributes(`newField`),
    placeholder: `New Field`,
    value: ``,
  },

  buttons: {
    save: {
      ...getElementBasicAttributes(`button-save`),
      label: `Save`,
      type: `submit`,
      disabled: true,
    },
    add: {
      ...getElementBasicAttributes(`button-add`),
      label: `Add`,
      type: `button`,
    },
    close: {
      ...getElementBasicAttributes(`button-close`),
      label: `Close`,
      type: `button`,
    },
  },
};

/**
 * Populate Dynamic Fields.
 *
 * @param formValues
 * @returns {object} Object with Dynamic Input name as key and corresponding value.
 */
const populateDefaultFormValues = (formValues: CredentialStoreType) => ({
  title: formValues.credential.title,
  ...formValues.credential.secure.reduce(
    (previousElementObject, { name, ...otherAttributes }) => ({
      ...previousElementObject,
      [name]: otherAttributes.value,
    }),
    {}
  ),
});

/**
 * Create Dynamic Input Field.
 *
 * @param name Name of the Input Element.
 * @param value Value of the Input Element
 * @returns {object} Attributes object of Input Elements.
 */
const createNewInputElement = (name: string, value = ``): InputInterface => ({
  ...getElementBasicAttributes(name),
  type: `text`,
  label: name,
  placeholder: name,
  value,
});

/**
 * Check if value is empty.
 *
 * @param fieldValue Value to be checked.
 * @returns {boolean} Returns true if empty else false.
 */
const checkIfFieldIsEmpty = (fieldValue: string) =>
  fieldValue.trim().length == 0;

/**
 * Check if values are equal.
 *
 * @param originalValue Orignal Value to be compared with.
 * @param newValue New value.
 * @returns {boolean} Returns true if equal else false.
 */
const checkIfEqual = (originalValue: string, newValue: string) =>
  originalValue === newValue;

const CredentialForm: React.FC<FormInterface> = ({
  id,
  submitAction,
  formValues,
}) => {
  const navigate = useNavigate();

  const [IS_ADD_FORM, IS_UPDATE_FORM] = useMemo(
    () => [id === `credential-form-add`, id === `credential-form-update`],
    [id]
  );

  const dynamicFormValues = useMemo(
    () =>
      IS_UPDATE_FORM
        ? populateDefaultFormValues(formValues as CredentialStoreType)
        : {},
    [IS_UPDATE_FORM, formValues]
  );

  // Default input value for Form Elements.
  const defaultFormValues: Record<string, string> = useMemo(
    () => ({
      title: ``,
      description: ``,
      newField: ``,
      ...dynamicFormValues,
    }),
    [dynamicFormValues]
  );

  const checkIfFormValuesChanged = useMemo(
    () => (formValue: Record<string, unknown>) =>
      IS_UPDATE_FORM &&
      checkIfEqual(
        JSON.stringify(defaultFormValues),
        JSON.stringify(formValue)
      ),
    [IS_UPDATE_FORM, defaultFormValues]
  );

  // Form Elements List.
  const [formElementsState, setFormElementsState] = useState(
    [] as InputInterface[]
  );
  // Form Elements Value.
  const [formElementsValue, setFormElementsValue] = useState(defaultFormValues);

  // 'Add' & 'Save' button disabled status.
  const [disableButtonStatus, setDisableButtonStatus] = useState({
    add: true,
    save: true,
  });

  /**
   * Handles Form Input changes.
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

    setDisableButtonStatus({
      // Disable 'Add' Button when input is empty or Field name already exists.
      add: checkIfEqual(formElements.newFieldInput.name, event.target.name)
        ? checkIfFieldIsEmpty(updatedForm.newField) ||
          Object.prototype.hasOwnProperty.call(
            formElementsValue,
            event.target.value
          )
        : disableButtonStatus.add,
      // Empty title or no changes in form value.
      save:
        checkIfFieldIsEmpty(updatedForm.title) ||
        checkIfFormValuesChanged(updatedForm),
    });

    setFormElementsValue(updatedForm);
  };

  /**
   * Add new Dynamic Field on button click.
   */
  const handleOnClick = () => {
    const updatedFormElementsValue: typeof defaultFormValues = {
      ...formElementsValue,
      newField: ``,
    };

    // Add new entry to 'formElementsValue' object.
    updatedFormElementsValue[formElementsValue.newField] = ``;

    setFormElementsState([
      ...formElementsState,
      createNewInputElement(formElementsValue.newField),
    ]);

    setFormElementsValue(updatedFormElementsValue);

    setDisableButtonStatus({ ...disableButtonStatus, add: true });
  };

  /**
   * Executes the Submit Action on Form Submit.
   *
   * @param event
   */
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    const finalformValues: CredentialStoreType = {
      ...(formValues as CredentialStoreType),
      credential: {
        title: formElementsValue.title,
        secure: [{ name: `description`, value: formElementsValue.description }],
      },
      updated_at: Date.now(),
    };

    formElementsState.map((formElement: InputInterface) => {
      finalformValues.credential.secure.push({
        name: formElement.name,
        value: formElementsValue[formElement.name as string],
      });
    });

    submitAction(finalformValues);

    if (IS_ADD_FORM) {
      // Reset Form Field Values.
      setFormElementsState([]);
      setFormElementsValue(defaultFormValues);
    }

    setDisableButtonStatus({ ...disableButtonStatus, save: true });
  };

  useEffect(() => {
    if (formValues !== undefined) {
      const secureCredentialList = [];

      for (const key in dynamicFormValues) {
        !(key === `title` || key === `description`) &&
          secureCredentialList.push(
            createNewInputElement(key, formValues[key] as string)
          );
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
        <Input
          {...(formElements.defaultInput[0] as InputInterface)}
          value={formElementsValue[formElements.defaultInput[0].name]}
          onChange={handleInputChange}
        />

        <TextArea
          {...formElements.defaultInput[1]}
          value={formElementsValue[formElements.defaultInput[1].name]}
          onChange={handleInputChange}
        />

        {formElementsState.map((elementObject: InputInterface) => (
          <Input
            key={elementObject.id}
            {...elementObject}
            value={formElementsValue[elementObject.name]}
            onChange={handleInputChange}
          />
        ))}
      </div>

      {IS_UPDATE_FORM && (
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
            {...formElements.newFieldInput}
            value={formElementsValue[formElements.newFieldInput.name]}
            onChange={handleInputChange}
          />

          <Button
            {...formElements.buttons.add}
            onClick={handleOnClick}
            disabled={disableButtonStatus.add}
          />
        </div>

        <div className="d-flex flex-row justify-content-evenly align-items-center form-button">
          {IS_UPDATE_FORM && (
            <Button
              {...formElements.buttons.close}
              onClick={() => navigate(-1)}
            />
          )}

          <Button
            {...formElements.buttons.save}
            disabled={disableButtonStatus.save}
          />
        </div>
      </div>
    </form>
  );
};

export default CredentialForm;

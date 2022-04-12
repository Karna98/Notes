/**
 * CredentialForm.tsx
 *
 * Description:
 *    Credential Form.
 *
 */

import { useMemo, useState } from 'react';
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
      label: `➕`,
      type: `button`,
    },
    remove: {
      ...getElementBasicAttributes(`button-remove`),
      label: `➖`,
      type: `button`,
    },
    reset: {
      ...getElementBasicAttributes(`button-reset`),
      label: `Reset`,
      type: `button`,
    },
  },
};

/**
 * Populate default form values.
 *
 * @param formData
 * @returns {object} Object with form field name as key and corresponding value.
 */
const populateDefaultFormValues = (formData: CredentialStoreType) => ({
  title: formData.credential.title,
  ...formData.credential.secure.reduce(
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
  formValues: formData,
}) => {
  const [IS_ADD_FORM, IS_UPDATE_FORM] = useMemo(
    () => [id === `credential-form-add`, id === `credential-form-update`],
    [id]
  );

  const { title, description, ...dynamicValues }: Record<string, string> =
    useMemo(
      () =>
        IS_UPDATE_FORM
          ? populateDefaultFormValues(formData as CredentialStoreType)
          : {},
      [IS_UPDATE_FORM, formData]
    );

  const defaultFormValues: Record<string, string> = useMemo(
    () => ({
      ...{
        title: IS_ADD_FORM ? `` : title,
        description: IS_ADD_FORM ? `` : description,
        newField: ``,
      },
      ...dynamicValues,
    }),
    [IS_ADD_FORM]
  );

  /**
   * Check if form values are updated or not.
   *
   * @param formValue Updated form values.
   * @returns {boolean} Return true if changed or else false.
   */
  const verifyChangeInForm = useMemo(
    () => (formValue: Record<string, unknown>) =>
      checkIfEqual(
        JSON.stringify(defaultFormValues),
        JSON.stringify(formValue)
      ),
    [defaultFormValues]
  );

  // Dynamic Elements List.
  const [dynamicFormElementsList, setDynamicFormElementsList] = useState(
    Object.keys(dynamicValues)
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
      save: checkIfEqual(formElements.newFieldInput.name, event.target.name)
        ? disableButtonStatus.save
        : checkIfFieldIsEmpty(updatedForm.title) ||
          (IS_UPDATE_FORM && verifyChangeInForm(updatedForm)),
    });

    setFormElementsValue(updatedForm);
  };

  /**
   * Add new Dynamic Field on button click.
   */
  const addFieldOnClick = () => {
    const updatedFormValue: Record<string, string> = {
      ...formElementsValue,
      newField: ``,
    };

    // Add new entry to 'formElementsValue' object.
    updatedFormValue[formElementsValue.newField] = ``;

    // Add new field to dynamic elements list.
    setDynamicFormElementsList([
      ...dynamicFormElementsList,
      formElementsValue.newField,
    ]);

    // Update Form's value object.
    setFormElementsValue(updatedFormValue);

    // Updated button disable status.
    setDisableButtonStatus({
      add: true,
      save: IS_UPDATE_FORM
        ? verifyChangeInForm(updatedFormValue)
        : disableButtonStatus.save,
    });
  };

  /**
   * Remove Dynamic Field.
   *
   * @param index Index of Element to be removed.
   */
  const removeFieldOnClick = (index: number) => {
    const elementsCopy = [...dynamicFormElementsList];
    const valuesCopy = { ...formElementsValue };

    // Remove field from list.
    const fieldRemoved = elementsCopy.splice(index, 1);

    // Remove field from form's value object.
    delete valuesCopy[fieldRemoved[0]];

    // Update state to new list.
    setDynamicFormElementsList(elementsCopy);
    // Update Form's value object.
    setFormElementsValue(valuesCopy);

    // Updated button disable status.
    IS_UPDATE_FORM &&
      setDisableButtonStatus({
        ...disableButtonStatus,
        save: verifyChangeInForm(valuesCopy),
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

    const finalformValues: CredentialStoreType = {
      _id: formData?._id as number,
      credential: {
        title: formElementsValue.title,
        secure: [{ name: `description`, value: formElementsValue.description }],
      },
      updated_at: Date.now(),
    };

    dynamicFormElementsList.map((field: string) => {
      finalformValues.credential.secure.push({
        name: field,
        value: formElementsValue[field],
      });
    });

    submitAction(finalformValues);

    if (IS_ADD_FORM) {
      // Reset Form Field Values.
      setDynamicFormElementsList([]);
      setFormElementsValue(defaultFormValues);
    }

    setDisableButtonStatus({ ...disableButtonStatus, save: true });
  };

  const formReset = () => {
    setFormElementsValue(defaultFormValues);
    setDynamicFormElementsList(Object.keys(dynamicValues));
    setDisableButtonStatus({
      add: true,
      save: true,
    });
  };

  return (
    <form
      id={id}
      method="POST"
      onSubmit={submitForm}
      className="d-flex flex-column justify-content-between"
    >
      {IS_UPDATE_FORM && (
        <div className="d-flex align-items-center form-updated-at">
          <sub>
            <b>Updated at </b>
            {new Date(formData?.updated_at as number).toLocaleString(`en-IN`, {
              hourCycle: `h23`,
            })}
          </sub>
        </div>
      )}

      <div className="d-flex flex-column align-items-center form-inputs">
        <div className="credential-title">
          <Input
            {...(formElements.defaultInput[0] as InputInterface)}
            value={formElementsValue[formElements.defaultInput[0].name]}
            onChange={handleInputChange}
          />
        </div>

        <div className="credential-description">
          <TextArea
            {...formElements.defaultInput[1]}
            value={formElementsValue[formElements.defaultInput[1].name]}
            onChange={handleInputChange}
          />
        </div>

        <div className="d-flex flex-column justify-content-evenly align-items-center form-dynamic-section">
          {dynamicFormElementsList.map((element: string, index: number) => (
            <div
              key={index}
              className="d-flex flex-row justify-content-evenly align-items-center dynamic-section"
            >
              <div className="d-flex justify-content-center align-items-center dynamic-section-button">
                <Button
                  {...formElements.buttons.remove}
                  onClick={() => {
                    removeFieldOnClick(index);
                  }}
                  className="button-type-square"
                />
              </div>

              <Input
                {...createNewInputElement(element, formElementsValue[element])}
                onChange={handleInputChange}
              />
            </div>
          ))}

          <div className="d-flex flex-row justify-content-evenly align-items-center dynamic-section">
            <Input
              {...formElements.newFieldInput}
              value={formElementsValue[formElements.newFieldInput.name]}
              onChange={handleInputChange}
            />

            <div className="d-flex justify-content-center align-items-center dynamic-section-button">
              <Button
                {...formElements.buttons.add}
                onClick={addFieldOnClick}
                disabled={disableButtonStatus.add}
                className="button-type-square"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-row justify-content-evenly align-items-center form-button">
        <Button
          {...formElements.buttons.reset}
          onClick={formReset}
          disabled={disableButtonStatus.save}
          className="button-type-1"
        />

        <Button
          {...formElements.buttons.save}
          disabled={disableButtonStatus.save}
          className="button-type-2"
        />
      </div>
    </form>
  );
};

export default CredentialForm;

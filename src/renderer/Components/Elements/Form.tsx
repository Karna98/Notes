/**
 * Form.tsx
 *
 * Description:
 *    Form Component similar to HTML Form.
 *
 */

import React, { useState } from 'react';
import Button from './Button';
import './form.scss';
import Input from './Input';

const Form: React.FC<FormElementInterface> = (props: FormElementInterface) => {
  const { method, formFields, inputElements, submitAction, reset, className } =
    props;

  // Form Fields
  const [form, setForm] = useState(formFields);

  /**
   * Handle Form Input changes.
   *
   * @param event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedForm = {
      ...form,
      [event.target.name]: event.target.value,
    };
    setForm(updatedForm);
  };

  /**
   * Executes the Submit Action on Form Submit.
   *
   * @param event
   */
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    submitAction(form);

    // Reset Form Field Values.
    reset && setForm(formFields);
  };

  return (
    <form
      method={method}
      onSubmit={submitForm}
      className={
        className === undefined
          ? 'd-flex flex-column align-items-center justify-content-evenly'
          : className
      }
    >
      {inputElements.map((attributes: InputElementInterface) => {
        return (
          <Input
            key={attributes.name}
            {...attributes}
            value={form[attributes.name]}
            onChange={handleInputChange}
          />
        );
      })}
      <Button label="Submit" type="submit" />
    </form>
  );
};

export default Form;

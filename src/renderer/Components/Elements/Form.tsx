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

const Form: React.FC<FormInterface> = (props) => {
  const { id, method, elements, submitAction, reset } = props;

  const formFields: Record<
    string,
    string | number | readonly string[] | undefined
  > = {};

  elements.input?.map((element) => {
    formFields[element.name] = element.value;
  });

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

  /**
   * Get className based on form id.
   *
   * @returns {string} Class Names.
   */
  const getClassName = (): string => {
    const defaultClassName =
      'd-flex flex-column align-items-center justify-content-evenly';
    switch (id) {
      case 'form-login':
        return defaultClassName + ' auth-form';
      case 'form-register':
        return defaultClassName + ' auth-form';
      case 'form-add-space':
        return defaultClassName + ' space-card';
      default:
        return defaultClassName;
    }
  };

  return (
    <form method={method} onSubmit={submitForm} className={getClassName()}>
      {elements.input?.map((attributes: InputInterface) => {
        return (
          <Input
            key={attributes.name}
            {...attributes}
            value={form[attributes.name]}
            onChange={handleInputChange}
          />
        );
      })}
      <div className="d-flex flex-row justify-content-evenly">
        {elements.button?.map((button) => (
          <Button key={button.id} {...button} />
        ))}
      </div>
    </form>
  );
};

export default Form;

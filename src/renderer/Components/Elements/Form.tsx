import React, { useState } from 'react';
import Input from './Input';

const Form: React.FC<FormElementInterface> = (props: FormElementInterface) => {
  const { method, formFields, inputElements, submitAction } = props;

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

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    submitAction(form);
  };

  return (
    <form method={method} onSubmit={submitForm}>
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;

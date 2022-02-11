/**
 * index.tsx
 *
 * Description:
 *    Form Component similar to HTML Form.
 *
 */

import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import AuthForm from './AuthForm';
import CredentialForm from './CredentialForm';
import './form.scss';
import LogoutForm from './LogoutForm';
import SpaceForm from './SpaceForm';

const Form: React.FC<FormInterface> = ({
  id,
  method = `POST`,
  elements,
  submitAction,
  reset,
  formValues,
}) => {
  const formFields: Record<
    string,
    string | number | readonly string[] | undefined
  > = {};

  elements?.input?.map((element) => {
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

  if (id.startsWith(`form-credential`))
    // Credential Related Form
    return (
      <CredentialForm
        id={id}
        submitAction={submitAction}
        formValues={formValues}
      />
    );
  else if (id.startsWith(`auth-form`))
    // Authentication - login/Register Related Form
    return <AuthForm id={id} submitAction={submitAction} />;
  else if (id.startsWith(`space-form`))
    // Space Related Form
    return <SpaceForm id={id} submitAction={submitAction} />;
  else if (id === `sidebar-logout-form`)
    // Logout Related Form
    return <LogoutForm id={id} submitAction={submitAction} />;
  else
    return (
      <form
        method={method}
        onSubmit={submitForm}
        className="d-flex flex-column align-items-center justify-content-evenly"
      >
        {elements?.input?.map((attributes: InputInterface) => {
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
          {elements?.button?.map((button) => (
            <Button key={button.id} {...button} />
          ))}
        </div>
      </form>
    );
};

export default Form;

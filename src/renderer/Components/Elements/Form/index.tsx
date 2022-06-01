/**
 * index.tsx
 *
 * Description:
 *    Form Component similar to HTML Form.
 *
 */

import AuthForm from './AuthForm';
import AuthPinForm from './AuthPinForm';
import CredentialForm from './CredentialForm';
import './form.scss';
import LogoutForm from './LogoutForm';
import NoteForm from './NoteForm';
import SpaceForm from './SpaceForm';

const FORM_AUTH_ = `auth-form`;
const FORM_AUTH_PIN_ = `auth-pin-form`;
const FORM_CREDENTIAL_ = `credential-form`;
const FORM_NOTE_ = `note-form`;

const FORM_LOGOUT = `sidebar-logout-form`;
const FORM_SPACE = `space-form-add`;

/**
 * Returns if the 'id' starts with provided string.
 * @param id Form ID.
 * @param stringStart Starting characters of the string to be tested against.
 * @returns {boolean} Returns true if 'id' starts with 'stringStart'.
 */
const idStartsWith = (id: string, stringStart: string) =>
  id.startsWith(stringStart);

const Form: React.FC<FormInterface> = (props) => {
  const { id } = props;

  if (idStartsWith(id, FORM_AUTH_))
    // Authentication - login/Register Related Form.
    return <AuthForm {...props} />;
  else if (idStartsWith(id, FORM_AUTH_PIN_))
    // Authentication PIN Related Form.
    return <AuthPinForm {...props} />;
  else if (id === FORM_LOGOUT)
    // Logout Related Form.
    return <LogoutForm {...props} />;
  else if (id === FORM_SPACE)
    // Space Related Form.
    return <SpaceForm {...props} />;
  else if (idStartsWith(id, FORM_NOTE_))
    // Note Related Form.
    return <NoteForm {...props} />;
  else if (idStartsWith(id, FORM_CREDENTIAL_))
    // Credential Related Form.
    return <CredentialForm {...props} />;

  // Throws Form Error.
  return <>Form Error !!!</>;
};

export default Form;

/**
 * index.tsx
 *
 * Description:
 *    Form Component similar to HTML Form.
 *
 */

import AuthForm from './AuthForm';
import CredentialForm from './CredentialForm';
import './form.scss';
import LogoutForm from './LogoutForm';
import NoteForm from './NoteForm';
import SpaceForm from './SpaceForm';

const Form: React.FC<FormInterface> = (props) => {
  if (props.id.startsWith(`auth-form`))
    // Authentication - login/Register Related Form.
    return <AuthForm {...props} />;
  else if (props.id === `sidebar-logout-form`)
    // Logout Related Form.
    return <LogoutForm {...props} />;
  else if (props.id.startsWith(`space-form`))
    // Space Related Form.
    return <SpaceForm {...props} />;
  else if (props.id.startsWith(`note-form`))
    // Note Related Form.
    return <NoteForm {...props} />;
  else if (props.id.startsWith(`credential-form`))
    // Credential Related Form.
    return <CredentialForm {...props} />;
  else return <>Form Error !!!</>;
};

export default Form;

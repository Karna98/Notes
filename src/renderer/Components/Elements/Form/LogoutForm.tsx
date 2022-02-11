/**
 * LogoutForm.tsx
 *
 * Description:
 *    Logout Form Componenet.
 *
 */

import { Button } from '..';

const getElementBasicAttributes = (elementName: string) => {
  return {
    id: `sidebar-${elementName}`,
    name: elementName,
  };
};

const formButtons: Record<string, ButtonInterface> = {
  logout: {
    ...getElementBasicAttributes(`button-logout`),
    label: `Logout`,
  },
};

const LogoutForm: React.FC<Pick<FormInterface, `id` | `submitAction`>> = ({
  id,
  submitAction,
}) => {
  /**
   * Executes the Submit Action on Form Submit.
   */
  const submitForm = () => {
    submitAction({});
  };

  return (
    <form id={id} method="POST" onSubmit={submitForm}>
      <div className="d-flex flex-row justify-content-evenly align-items-center">
        <Button {...formButtons.logout} />
      </div>
    </form>
  );
};

export default LogoutForm;

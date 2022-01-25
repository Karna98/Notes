/**
 * Logout.tsx
 *
 * Description:
 *    Logout Componenet.
 *
 */

import { Form } from 'renderer/Components';
import { useAppDispatch } from 'renderer/Hooks';
import { clearSessionState, clearSpacesState } from 'renderer/State';

const Logout = () => {
  const dispatch = useAppDispatch();

  // Form Elements.
  const formElements: FormElementsInterface = {
    button: [
      {
        id: 'logout',
        label: 'Logout',
      },
    ],
  };

  /**
   * Clears all store data.
   */
  const onClick = () => {
    // Clear all redux stores on logout.
    dispatch(clearSessionState());
    dispatch(clearSpacesState());
  };

  return (
    <Form
      id="form-logout"
      method="POST"
      elements={formElements}
      submitAction={onClick}
    />
  );
};

export default Logout;

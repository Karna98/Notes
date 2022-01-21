/**
 * Logout.tsx
 *
 * Description:
 *    Logout Componenet.
 *
 */

import React from 'react';
import { useAppDispatch } from '../../Hooks';
import { clearSessionState, clearSpacesState } from '../../State/reducer';
import Form from '../Elements/Form';

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

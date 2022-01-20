/**
 * Logout.tsx
 *
 * Description:
 *    Logout Componenet.
 *
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { reactRoutes } from '../../../common/routes';
import { useAppDispatch } from '../../Hooks';
import { clearSessionState, clearSpacesState } from '../../State/reducer';
import Form from '../Elements/Form';

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

    // Navigate to Login Page.
    navigate(reactRoutes.auth_login);
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

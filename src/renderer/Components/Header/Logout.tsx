/**
 * Logout.tsx
 *
 * Description:
 *    Logout Componenet.
 *
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import {
  clearResponseState,
  clearSessionState,
  clearSpacesState,
  clearSpaceState,
} from '../../State/reducer';
import Form from '../Elements/Form';

const Logout = () => {
  const dispatch = useDispatch();

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
    dispatch(clearSpaceState());
    // @TODO: Verify if we need to clear response state. On auth page, the page requests for auth status and overrides previous response state.
    dispatch(clearResponseState());
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

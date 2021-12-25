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
} from '../../State/reducer';
import Button from '../Elements/Button';

const Logout = () => {
  const dispatch = useDispatch();

  /**
   * Clear Session data on click.
   */
  const onClick = () => {
    // Clear all redux stores on logout.
    dispatch(clearSessionState());
    dispatch(clearSpacesState());
    // @TODO: Verify if we need to clear response state. On auth page, the page requests for auth status and overrides previous response state.
    dispatch(clearResponseState());
  };

  return (
    <div>
      <Button label="Logout" onClick={onClick} />
    </div>
  );
};

export default Logout;

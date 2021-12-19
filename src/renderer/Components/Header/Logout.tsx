/**
 * Navbar.tsx
 *
 * Description:
 *    Logout Componenet.
 *
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { clearSessionState } from '../../State/reducer';
import Button from '../Elements/Button';

const Logout = () => {
  const dispatch = useDispatch();

  /**
   * Clear Session data on click.
   */
  const onClick = () => {
    dispatch(clearSessionState());
  };

  return (
    <div>
      <Button label="Logout" onClick={onClick} />
    </div>
  );
};

export default Logout;

/**
 * Navbar.tsx
 *
 * Description:
 *    Navbar Section.
 *
 */

import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import IMAGE from '../../../assets/logo/png/256x256.png';
import Logout from './Logout';

const Navbar = () => {
  // Get session value stored in Redux Store.
  const sessionState = useSelector((state: RootStateOrAny) => state.session);

  return (
    <div className="d-flex flex-row align-items-center justify-content-between navbar">
      <div className="d-flex flex-row align-items-center">
        <img src={IMAGE} alt="Notes Logo" className="icon" />
        <h2>Notes</h2>
      </div>
      {sessionState != null && <Logout />}
    </div>
  );
};

export default Navbar;

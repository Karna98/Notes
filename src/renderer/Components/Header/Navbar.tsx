/**
 * Navbar.tsx
 *
 * Description:
 *    Navbar Section.
 *
 */

import IMAGE from 'assets/logo/png/256x256.png';
import { reactRoutes } from 'common/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'renderer/Hooks';
import Logout from './Logout';

const Navbar = () => {
  // Get session value stored in Redux Store.
  const sessionState = useAppSelector((state) => state.session);

  return (
    <div className="d-flex flex-row align-items-center justify-content-between navbar">
      <div className="d-flex flex-row align-items-center">
        <img src={IMAGE} alt="Notes Logo" className="icon" />
        <h2>Notes</h2>
      </div>

      {sessionState != null && (
        <div className="d-flex flex-row align-items-center navbar-links">
          <Link to={reactRoutes.spaces}>Spaces</Link>
          <Link to={reactRoutes.profile}>Profile</Link>
          <Logout />
        </div>
      )}
    </div>
  );
};

export default Navbar;

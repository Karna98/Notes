/**
 * Navbar.tsx
 *
 * Description:
 *    Navbar Component.
 *
 */

import React from 'react';
import IMAGE from '../../../assets/logo/png/256x256.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>
        <img src={IMAGE} alt="Notes Logo" />
        Notes
      </h1>
    </div>
  );
};

export default Navbar;

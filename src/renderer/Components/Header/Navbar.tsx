/**
 * Navbar.tsx
 *
 * Description:
 *    Styles for Navbar.
 *
 */

import React from 'react';
import IMAGE from '../../../assets/logo/png/256x256.png';

const Navbar = () => {
  return (
    <div className="d-flex flex-row align-items-center navbar">
      <img src={IMAGE} alt="Notes Logo" className="icon" />
      <h2>Notes</h2>
    </div>
  );
};

export default Navbar;

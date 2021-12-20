/**
 * index.tsx
 *
 * Description:
 *    Spaces Component.
 *
 */

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import List from './List';
import Space from './Space';
import './spaces.scss';

const Spaces = () => {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path={`:space_id`} element={<Space />} />
    </Routes>
  );
};

export default Spaces;

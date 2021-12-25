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

const routeList = [
  {
    name: 'Spaces Page',
    path: '/',
    element: <List />,
  },
  {
    name: 'Space Page',
    path: `:space_id`,
    element: <Space />,
  },
];

const Spaces = () => {
  return (
    <Routes>
      {routeList.map((route) => (
        <Route key={route.name} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Spaces;

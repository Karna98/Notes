/**
 * index.tsx
 *
 * Description:
 *    Spaces Component.
 *
 */

import { CONSTANT } from 'common';
import { Route, Routes } from 'react-router-dom';
import List from './List';
import Space from './Space';
import './spaces.scss';

// Constant String.
const { ENDPOINT } = CONSTANT.REACT;

const routeList = [
  {
    name: `Spaces Page`,
    path: ENDPOINT.ROOT,
    element: <List />,
  },
  {
    name: `Space Page`,
    path: ENDPOINT.SPACE_,
    element: <Space />,
  },
];

const Spaces = () => (
  <div className="spaces">
    <Routes>
      {routeList.map((route) => (
        <Route key={route.name} path={route.path} element={route.element} />
      ))}
    </Routes>
  </div>
);

export default Spaces;

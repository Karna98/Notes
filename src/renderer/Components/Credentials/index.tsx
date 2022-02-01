/**
 * index.tsx
 *
 * Description:
 *    Credentials Component.
 *
 */

import { resolveReactRoutes } from 'common';
import { Route, Routes } from 'react-router-dom';
import Credential from './Credential';
import './credentials.scss';
import List from './List';

const routeList = [
  {
    name: 'Credentials',
    path: resolveReactRoutes('root'),
    element: <List />,
  },
  {
    name: 'Note',
    path: `:credential_id`,
    element: <Credential />,
  },
];

const Credentials = () => {
  return (
    <div className="d-flex flex-row flex-wrap justify-content-evenly">
      <Routes>
        {routeList.map((route) => (
          <Route key={route.name} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default Credentials;

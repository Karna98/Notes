/**
 * Space.tsx
 *
 * Description:
 *    Space Component.
 *
 */

import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';

const Space = () => {
  // Get spaces value stored in Redux Store.
  const spacesState = useSelector((state: RootStateOrAny) => state.spaces);

  // Infer space_id passed in URL.
  const { space_id } = useParams();

  // Get Space details regarding space_id.
  const currentSpace = spacesState.list.filter(
    ({ _id }: SpacesTableInterface) => _id == Number(space_id)
  )[0];

  const sidebarLinks = [
    {
      title: 'Notes',
      URI: `/spaces/${space_id}/notes`,
    },
  ];

  const routeList = [
    {
      name: 'Space Welcome Page',
      path: '/',
      element: (
        <>
          Welcome to <h3>{currentSpace.space_name} Space.</h3>
        </>
      ),
    },
    {
      name: 'notes',
      path: '/notes',
      element: <>Notes</>,
    },
  ];

  return (
    <div className="d-flex flex-row space">
      <Sidebar title={currentSpace.space_name} links={sidebarLinks} />
      <div className="space-content">
        <Routes>
          {routeList.map((route) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default Space;

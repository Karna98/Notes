/**
 * Space.tsx
 *
 * Description:
 *    Space Component.
 *
 */

import React, { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { IPCRequestObject } from '../../../common/util';
import { useAppSelector } from '../../Hooks';
import { sendToIpcMain } from '../../util';
import Notes from '../Notes';
import Sidebar from '../Sidebar';

const Space = () => {
  // Get spaces value stored in Redux Store.
  const spacesState = useAppSelector((state) => state.spaces);

  // Infer space_id passed in URL.
  const { space_id } = useParams();

  // Get Space details regarding space_id.
  const currentSpaceDetails = spacesState?.list.filter(
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
          Welcome to <h3>{currentSpaceDetails?.space_name} Space.</h3>
        </>
      ),
    },
    {
      name: 'notes',
      path: '/notes/*',
      element: <Notes />,
    },
  ];

  useEffect(() => {
    if (
      spacesState?.currentSpace === undefined ||
      spacesState.currentSpace.space_id != Number(space_id)
    )
      sendToIpcMain(
        IPCRequestObject(`spaces-get-space`, { _id: Number(space_id) })
      );
  }, []);

  return (
    <div className="d-flex flex-row space">
      <Sidebar title={currentSpaceDetails?.space_name} links={sidebarLinks} />
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

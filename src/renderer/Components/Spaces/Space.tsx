/**
 * Space.tsx
 *
 * Description:
 *    Space Component.
 *
 */

import { IPCRequestObject, resolveReactRoutes } from 'common';
import { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { Credentials, Notes, Sidebar } from 'renderer/Components';
import { useAppSelector } from 'renderer/Hooks';
import { sendToIpcMain } from 'renderer/util';

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
      URI: resolveReactRoutes('notes', { space_id: Number(space_id) }),
    },
    {
      title: 'Credentials',
      URI: resolveReactRoutes('credentials', { space_id: Number(space_id) }),
    },
  ];

  const routeList = [
    {
      name: 'Space Welcome Page',
      path: resolveReactRoutes('root'),
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
    {
      name: 'credentials',
      path: '/credentials/*',
      element: <Credentials />,
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

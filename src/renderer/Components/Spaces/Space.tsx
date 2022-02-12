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
import { Credentials, Notes } from 'renderer/Components';
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

  const routeList = [
    {
      name: `Space Welcome Page`,
      path: resolveReactRoutes(`root`),
      element: (
        <div className="d-flex flex-column justify-content-center align-items-center space">
          <h4>Welcome to</h4>
          <h2>
            <i>{currentSpaceDetails?.space_name}</i>
          </h2>
          <h4>Space</h4>
        </div>
      ),
    },
    {
      name: `notes`,
      path: `/notes/*`,
      element: <Notes />,
    },
    {
      name: `credentials`,
      path: `/credentials/*`,
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
    <Routes>
      {routeList.map((route) => (
        <Route key={route.name} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Space;

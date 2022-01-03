/**
 * Space.tsx
 *
 * Description:
 *    Space Component.
 *
 */

import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import { IPCRequestObject } from '../../../common/util';
import { updateSpaceState } from '../../State/reducer';
import { sendToIpcMain } from '../../util';
import Notes from '../Notes';
import Sidebar from '../Sidebar';

const Space = () => {
  const dispatch = useDispatch();
  // Get response value stored in Redux Store.
  const responseState = useSelector((state: RootStateOrAny) => state.response);
  // Get spaces value stored in Redux Store.
  const spacesState = useSelector((state: RootStateOrAny) => state.spaces);
  // Get space value stored in Redux Store.
  const spaceState = useSelector((state: RootStateOrAny) => state.space);

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
      path: '/notes/*',
      element: <Notes />,
    },
  ];

  /**
   * Resolves Response received.
   */
  const resolveResponse = () => {
    switch (responseState.URI) {
      case 'notes-get':
        if (responseState.status == 200)
          dispatch(
            updateSpaceState({
              space_id: Number(space_id),
              notes: responseState.data,
            })
          );
        break;
    }
  };

  useEffect(() => {
    if (spaceState == null || spaceState.space_id != Number(space_id))
      sendToIpcMain(
        IPCRequestObject(`notes-get`, { space_id: Number(space_id) })
      );
    resolveResponse();
  }, []);

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

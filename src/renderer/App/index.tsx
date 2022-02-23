/**
 * index.tsx
 *
 * Description:
 *    Base file for all the pages to be rendered.
 */

import { IPCRequestObject, resolveReactRoutes } from 'common';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Message, Sidebar, Spaces } from 'renderer/Components';
import { useAppSelector, useResponse } from 'renderer/Hooks';
import { sendToIpcMain } from 'renderer/util';
import Auth from './Auth';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoutes';

const App = () => {
  // Resolve Response Hook.
  useResponse();

  // Get session value stored in Redux Store.
  const sessionState = useAppSelector((state) => state.session);

  /**
   * User is authenticated if session is created.
   *
   * @returns {boolean} Status of Session created or not.
   */
  const isAuthenticated = (): boolean => !(sessionState === null);

  /**
   * Return Protected Route element.
   *
   * @param element Children Element to be rendered.
   * @param redirect To be redirect to.
   * @param condition Boolean condition to redirect or not.
   * @returns
   */
  const getProtectedRoutes = (
    element: React.ReactElement,
    redirect?: string,
    condition?: boolean
  ) => (
    <ProtectedRoute
      redirectTo={
        redirect === undefined ? resolveReactRoutes(`auth_login`) : redirect
      }
      condition={condition === undefined ? isAuthenticated() : condition}
    >
      {element}
    </ProtectedRoute>
  );

  useEffect(() => {
    // Get Auth Status.
    sendToIpcMain(IPCRequestObject(`auth-status`));
  }, []);

  // List of Routes.
  const RouteList = [
    {
      name: `Startup Page`,
      path: resolveReactRoutes(`root`),
      element: <div> Loading.. </div>,
    },
    {
      name: `Auth Page`,
      path: resolveReactRoutes(`auth`) + `/*`,
      element: getProtectedRoutes(
        <Auth />,
        resolveReactRoutes(`spaces`),
        !isAuthenticated()
      ),
    },
    {
      name: `Spaces Page`,
      path: resolveReactRoutes(`spaces`) + `/*`,
      element: getProtectedRoutes(<Spaces />),
    },
    {
      name: `Profile Page`,
      path: resolveReactRoutes(`profile`),
      element: getProtectedRoutes(<Profile />),
    },
  ];

  return (
    <div className="d-flex flex-row justify-content-center card-block body-content">
      {sessionState !== null && <Sidebar />}
      <main className="d-flex flex-column justify-content-center align-items-center">
        <Message />
        <Routes>
          {RouteList.map((route) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </div>
  );
};

export default App;

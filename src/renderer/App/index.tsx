/**
 * index.tsx
 *
 * Description:
 *    Base file for all the pages to be rendered.
 */

import React, { useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { reactRoutes } from '../../common/routes';
import { IPCRequestObject } from '../../common/util';
import Message from '../Components/Elements/Message';
import Header from '../Components/Header';
import Spaces from '../Components/Spaces';
import useResponse from '../Hooks/useResponse';
import { sendToIpcMain } from '../util';
// import { updateResponseState } from '../State/reducer';
import Auth from './Auth';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoutes';

const App = () => {
  // Resolve Response Hook.
  useResponse();

  // Get message value stored in Redux Store.
  const messageState = useSelector((state: RootStateOrAny) => state.message);
  // Get session value stored in Redux Store.
  const sessionState = useSelector((state: RootStateOrAny) => state.session);

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
  ) => {
    return (
      <ProtectedRoute
        redirectTo={redirect === undefined ? reactRoutes.auth : redirect}
        condition={condition === undefined ? isAuthenticated() : condition}
      >
        {element}
      </ProtectedRoute>
    );
  };

  useEffect(() => {
    // Get Auth Status.
    sendToIpcMain(IPCRequestObject(`auth-status`));
  }, []);

  // List of Routes.
  const RouteList = [
    {
      name: 'Startup Page',
      path: `${reactRoutes.home}`,
      element: <div> Loading.. </div>,
    },
    {
      name: 'Auth Page',
      path: `${reactRoutes.auth}/*`,
      element: getProtectedRoutes(
        <Auth />,
        reactRoutes.spaces,
        !isAuthenticated()
      ),
    },
    {
      name: 'Spaces Page',
      path: `${reactRoutes.spaces}/*`,
      element: getProtectedRoutes(<Spaces />),
    },
    {
      name: 'Profile Page',
      path: reactRoutes.profile,
      element: getProtectedRoutes(<Profile />),
    },
  ];

  return (
    <>
      <Header />
      <main className="d-flex flex-column">
        {messageState != null && (
          <Message messageState={messageState} autoDisappear={true} />
        )}
        <Routes>
          {RouteList.map((route) => (
            <Route key={route.name} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </>
  );
};

export default App;

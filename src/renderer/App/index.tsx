/**
 * index.tsx
 *
 * Description:
 *    Base file for all the pages to be rendered.
 */

import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { reactRoutes } from '../../common/routes';
import Message from '../Components/Elements/Message';
import Header from '../Components/Header';
import { updateResponseState } from '../State/reducer';
import Auth from './Auth';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoutes';
import Spaces from './Spaces';

const App = () => {
  const dispatch = useDispatch();

  // Get response value stored in Redux Store.
  const responseState = useSelector((state: RootStateOrAny) => state.response);
  // Get message value stored in Redux Store.
  const messageState = useSelector((state: RootStateOrAny) => state.message);
  // Get session value stored in Redux Store.
  const sessionState = useSelector((state: RootStateOrAny) => state.session);

  useEffect(() => {
    window.NotesAPI.receive(`fromMain`, (responseData: string) => {
      // Update response in Redux Store
      dispatch(updateResponseState(JSON.parse(responseData)));
    });
  }, [responseState]);

  const isAuthenticated = () => !(sessionState === null);

  return (
    <>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        {messageState != null && (
          <Message messageState={messageState} autoDisappear={true} />
        )}
        <Routes>
          <Route
            path={reactRoutes.auth}
            element={
              <ProtectedRoute
                redirectTo={reactRoutes.space}
                condition={!isAuthenticated()}
              >
                <Auth />
              </ProtectedRoute>
            }
          />
          <Route
            path={reactRoutes.space}
            element={
              <ProtectedRoute
                redirectTo={reactRoutes.auth}
                condition={isAuthenticated()}
              >
                <Spaces />
              </ProtectedRoute>
            }
          />
          <Route
            path={reactRoutes.profile}
            element={
              <ProtectedRoute
                redirectTo={reactRoutes.auth}
                condition={isAuthenticated()}
              >
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;

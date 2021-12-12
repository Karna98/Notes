/**
 * App.tsx
 *
 * Description:
 *    Base file for all the pages to be rendered.
 */

import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { updateResponseState } from '../State/reducer';
import Header from '../Components/Header';
import Auth from './Auth';

const App = () => {
  const dispatch = useDispatch();

  // Get response value stored in Redux Store.
  const responseState = useSelector((state: RootStateOrAny) => state.response);
  // Get message value stored in Redux Store.
  const messageState = useSelector((state: RootStateOrAny) => state.message);

  useEffect(() => {
    window.NotesAPI.receive(`fromMain`, (responseData: string) => {
      // Update response in Redux Store
      dispatch(updateResponseState(JSON.parse(responseData)));
    });
  }, [responseState]);

  return (
    <Router>
      <Header />
      <div>
        <div>
          {messageState.status !== undefined &&
            `Message : [${messageState.status}] : ${messageState.message}`}
        </div>
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

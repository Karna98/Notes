/**
 * Home.tsx
 *
 * Description:
 *    Home Component.
 *
 */

import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

const Home = () => {
  // Get session value stored in Redux Store.
  const sessionState = useSelector((state: RootStateOrAny) => state.session);

  return (
    <>
      <div>
        <h1>Hey, {sessionState.username}</h1>
      </div>
      <div>Welcome To Notes.</div>
      {sessionState.last_logged_in != null && (
        <div>
          <b>Last Logged In at</b> :
          <i>{new Date(sessionState.last_logged_in).toString()}</i>
        </div>
      )}
    </>
  );
};

export default Home;

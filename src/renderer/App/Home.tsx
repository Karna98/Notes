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
        <h2>Hey,</h2>
        <h3>{sessionState.username}</h3>
      </div>
      <div>Welcome To Notes.</div>
    </>
  );
};

export default Home;

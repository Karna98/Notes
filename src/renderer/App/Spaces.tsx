/**
 * Spaces.tsx
 *
 * Description:
 *    Spaces Component.
 *
 */

import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

const Spaces = () => {
  // Get session value stored in Redux Store.
  const sessionState = useSelector((state: RootStateOrAny) => state.session);

  return (
    <>
      <div>
        <h1>Hey, {sessionState.username}</h1>
      </div>
      <div>Welcome To Notes. This are Spaces</div>
    </>
  );
};

export default Spaces;

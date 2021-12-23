/**
 * Space.tsx
 *
 * Description:
 *    Space Component.
 *
 */

import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Space = () => {
  // Get spaces value stored in Redux Store.
  const spacesState = useSelector((state: RootStateOrAny) => state.spaces);

  // Infer space_id passed in URL.
  const { space_id } = useParams();

  // Get Space details regarding space_id.
  const currentSpace = spacesState.list.filter(
    ({ _id }: SpaceDetailType) => _id == space_id
  )[0];

  return (
    <>
      <h2>{currentSpace.space_name} Space</h2>
      <hr />
      <p>
        ID :<b>{currentSpace._id}</b>
        <br />
        Created on : <b>{new Date(currentSpace.created_at).toLocaleString()}</b>
      </p>
    </>
  );
};

export default Space;

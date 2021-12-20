/**
 * Space.tsx
 *
 * Description:
 *    Space Component.
 *
 */

import React from 'react';
import { useParams } from 'react-router-dom';

const Space = () => {
  const { space_id } = useParams();
  return <>This is Space with ID {space_id}.</>;
};

export default Space;

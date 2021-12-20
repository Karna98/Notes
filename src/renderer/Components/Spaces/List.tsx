/**
 * List.tsx
 *
 * Description:
 *    List Spaces on Page.
 *
 */

import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../Elements/Button';

type SpacesType = {
  active: boolean;
  _id: number;
  name: string;
};

const List = () => {
  // Get session value stored in Redux Store.
  const sessionState = useSelector((state: RootStateOrAny) => state.session);

  // Total no. of space can be created.
  const TOTAL_SPACE_CARDS = 4;

  // Sample Static Spaces.
  const spacesList: SpacesType[] = [
    { _id: 1, name: 'Personal', active: true },
    { _id: 2, name: 'Work', active: true },
  ];

  /**
   * Add new spaces. (Dummy Function)
   */
  const addNewSpace = () => {
    console.log('New Space Added');
  };

  return (
    <>
      <div className="spaces-top">
        <h4>Hey, {sessionState.username}</h4>
        <b>Which space you want to dive in ?</b>
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly align-items-center spaces-content">
        {spacesList.map((value: SpacesType) => (
          <Link
            to={`${value._id}`}
            key={value._id}
            className="d-flex justify-content-center align-items-center space-card"
            aria-disabled
          >
            {value.name}
          </Link>
        ))}

        {spacesList.length < TOTAL_SPACE_CARDS && (
          <Button
            className="d-flex justify-content-center align-items-center space-card"
            label="Add Spaces"
            onClick={addNewSpace}
          />
        )}
      </div>
    </>
  );
};

export default List;

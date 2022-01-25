/**
 * index.tsx
 *
 * Description:
 *    Notes Component.
 *
 */

import { Route, Routes } from 'react-router-dom';
import List from './List';
import Note from './Note';
import './notes.scss';

const routeList = [
  {
    name: 'Notes',
    path: '/',
    element: <List />,
  },
  {
    name: 'Note',
    path: `:note_id`,
    element: <Note />,
  },
];

const Notes = () => {
  return (
    <div className="d-flex flex-row flex-wrap justify-content-evenly notes-body">
      <Routes>
        {routeList.map((route) => (
          <Route key={route.name} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default Notes;

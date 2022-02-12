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
    name: `Notes`,
    path: `/`,
    element: <List />,
  },
  {
    name: `Note`,
    path: `:note_id`,
    element: <Note />,
  },
];

const Notes = () => (
  <Routes>
    {routeList.map((route) => (
      <Route key={route.name} path={route.path} element={route.element} />
    ))}
  </Routes>
);
export default Notes;

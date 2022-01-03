/**
 * Note.tsx
 *
 * Description:
 *    Note Component.
 *
 */

import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Elements/Button';

const Note = () => {
  const navigate = useNavigate();
  // Infer note_id passed in URL.
  const { note_id } = useParams();

  // Get space value stored in Redux Store.
  const spaceState = useSelector((state: RootStateOrAny) => state.space);

  const note = spaceState?.notes.filter(
    ({ _id }: NotesTableInterface) => _id == Number(note_id)
  )[0];

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        <p>
          ID: {note._id} <br /> Space ID: {note.space_id}
        </p>
        <p>{note.note}</p>
        <p>Last Updated at: {note.updated_at}</p>
      </div>

      <div>
        <Button id="close-note" label="Close Note" onClick={onClose} />
      </div>
    </>
  );
};

export default Note;

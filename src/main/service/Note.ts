/**
 * Note.ts
 *
 * Description:
 *    Resolves requests regarding Note.
 *
 */

import { CONSTANT, createMessage } from '../../common';
import database from './../sql';

// Constant Endpoint String.
const { ENDPOINT } = CONSTANT;

/**
 * Handles Note related requests.
 *
 * @param requestType
 * @param requestData
 * @param resolvedSubRequest
 */
const resolveNote = (
  requestType: string[],
  requestData: NoteRequestType,
  resolvedSubRequest: SubRequestResponseType
): void => {
  switch (requestType[1]) {
    case ENDPOINT.ADD:
      const createStatus = database.createNewNote(
        requestData.space_id,
        requestData.note
      );

      if (createStatus.changes)
        // Get newly inserted Note.
        resolvedSubRequest.data = database.getNoteWithId(
          createStatus.lastInsertRowid
        );

      resolvedSubRequest.message = createStatus.changes
        ? // Note Added Successfully.
          createMessage('success')
        : // Error while adding Note.
          createMessage('server-error', `Error while adding note.`);
      break;

    case ENDPOINT.UPDATE:
      // Update note.
      const updateStatus = database.updateNote(
        { note: requestData.note, updated_at: requestData.updated_at },
        requestData._id
      );

      if (updateStatus)
        resolvedSubRequest.data = {
          _id: requestData._id,
          note: requestData.note,
          updated_at: requestData.updated_at,
        };

      resolvedSubRequest.message = updateStatus
        ? // Note updated Successfully.
          createMessage('success')
        : // Error while updating Note.
          createMessage('server-error', `Error while saving note.`);
      break;

    case ENDPOINT.GET_ALL:
      // Get all Notes.
      const noteList: NotesTableInterface[] = database.getNotes(
        (resolvedSubRequest.data as SpaceInterface).space_id
      );

      // Converting to type of NoteStoreType[] from NotesTableInterface[].
      const noteListSanitized: NoteStoreType[] = noteList.map(
        ({ _id, note, updated_at }: NotesTableInterface) => ({
          _id,
          note,
          updated_at,
        })
      );

      resolvedSubRequest.data = {
        ...(resolvedSubRequest.data as object),
        notes: noteListSanitized,
      };
      break;

    default:
      break;
  }
};

export { resolveNote };

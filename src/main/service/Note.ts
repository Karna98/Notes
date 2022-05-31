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
const { ENDPOINT, MSG_CODE } = CONSTANT;

// Constant Message String.
const MSG_STR = {
  NOTE_ADD_FAILED: `Error while adding Note !`,
  NOTE_UPDATE_FAILED: `Error while saving Note !`,
};

/**
 * Handles Note related requests.
 *
 * @param requestURI
 * @param requestData
 * @param resolvedSubResponse
 */
const resolveNote = (
  requestURI: string[],
  resolvedSubResponse: SubRequestResponseType,
  requestData: NoteRequestType
): void => {
  switch (requestURI[1]) {
    case ENDPOINT.ADD:
      const createStatus = database.createNewNote(
        requestData.space_id,
        requestData.note
      );

      if (createStatus.changes)
        // Get newly inserted Note.
        resolvedSubResponse.data = database.getNoteWithId(
          createStatus.lastInsertRowid
        );

      resolvedSubResponse.message = createStatus.changes
        ? // Note Added Successfully.
          createMessage(MSG_CODE.SUCCESS)
        : // Error while adding Note.
          createMessage(MSG_CODE.ERR_SERVER, MSG_STR.NOTE_ADD_FAILED);
      break;

    case ENDPOINT.UPDATE:
      // Update note.
      const updateStatus = database.updateNote(
        { note: requestData.note, updated_at: requestData.updated_at },
        requestData._id
      );

      if (updateStatus)
        resolvedSubResponse.data = {
          _id: requestData._id,
          note: requestData.note,
          updated_at: requestData.updated_at,
        };

      resolvedSubResponse.message = updateStatus
        ? // Note updated Successfully.
          createMessage(MSG_CODE.SUCCESS)
        : // Error while updating Note.
          createMessage(MSG_CODE.ERR_SERVER, MSG_STR.NOTE_UPDATE_FAILED);
      break;

    case ENDPOINT.GET_ALL:
      // Get all Notes.
      const noteList: NotesTableInterface[] = database.getNotes(
        (resolvedSubResponse.data as SpaceInterface).space_id
      );

      // Converting to type of NoteStoreType[] from NotesTableInterface[].
      const noteListSanitized: NoteStoreType[] = noteList.map(
        ({ _id, note, updated_at }: NotesTableInterface) => ({
          _id,
          note,
          updated_at,
        })
      );

      resolvedSubResponse.data = {
        ...(resolvedSubResponse.data as object),
        notes: noteListSanitized,
      };
      break;

    default:
      break;
  }
};

export { resolveNote };

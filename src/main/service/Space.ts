/**
 * Space.ts
 *
 * Description:
 *    Resolves requests regarding Space.
 *
 */

import { CONSTANT, createMessage } from '../../common';
import database from './../sql';
import CONFIG from '../config';

// Constant Endpoint String.
const { ENDPOINT } = CONSTANT;

/**
 * Handles Spaces related requests.
 *
 * @param requestType
 * @param requestData
 * @param resolvedSubRequest
 */
const resolveSpace = (
  requestType: string[],
  requestData: SpaceRequestType,
  resolvedSubRequest: SubRequestResponseType
): void => {
  switch (requestType[1]) {
    case ENDPOINT.GET:
      resolvedSubRequest.data = {
        metaData: {
          SPACES_MAX_COUNT_ALLOWED: CONFIG.SPACES_MAX_COUNT_ALLOWED,
        },
        // Get all spaces.
        list: database.getSpaces(),
      };

      resolvedSubRequest.message = createMessage('success');
      break;

    case ENDPOINT.ADD:
      const createStatus = database.createNewSpace(requestData.space_name);

      if (createStatus.changes)
        // Get newly inserted Space.
        resolvedSubRequest.data = database.getSpaceWithId(
          createStatus.lastInsertRowid
        );

      resolvedSubRequest.message = createStatus.changes
        ? // Space Added Successfully.
          createMessage(
            'success',
            `${requestData.space_name} Space added successfully.`
          )
        : // Error while adding Space.
          createMessage(
            'server-error',
            `Error while adding ${requestData.space_name} Space.`
          );

      break;

    case ENDPOINT.GET_SPACE:
      // Get all Notes.
      const notesList: NotesTableInterface[] = database.getNotes(
        requestData._id
      );

      // Converting to type of NoteStoreType[] from NotesTableInterface[].
      const notesListMapped: NoteStoreType[] = notesList.map(
        ({ _id, note, updated_at }: NotesTableInterface) => ({
          _id,
          note,
          updated_at,
        })
      );

      // Get all data related to Space ID.
      resolvedSubRequest.data = {
        space_id: requestData._id,
        notes: notesListMapped,
      };

      resolvedSubRequest.message = createMessage('success');
      break;

    default:
      break;
  }
};

export { resolveSpace };

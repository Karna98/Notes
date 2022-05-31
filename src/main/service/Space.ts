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
 * Handles Space related requests.
 *
 * @param requestURI
 * @param requestData
 * @param resolvedSubResponse
 */
const resolveSpace = (
  requestURI: string[],
  resolvedSubResponse: SubRequestResponseType,
  requestData: SpaceRequestType
): void => {
  switch (requestURI[1]) {
    case ENDPOINT.GET:
      resolvedSubResponse.data = {
        metaData: {
          SPACES_MAX_COUNT_ALLOWED: CONFIG.SPACES_MAX_COUNT_ALLOWED,
        },
        // Get all spaces.
        list: database.getSpaces(),
      };

      resolvedSubResponse.message = createMessage('success');
      break;

    case ENDPOINT.ADD:
      const createStatus = database.createNewSpace(requestData.space_name);

      if (createStatus.changes)
        // Get newly inserted Space.
        resolvedSubResponse.data = database.getSpaceWithId(
          createStatus.lastInsertRowid
        );

      resolvedSubResponse.message = createStatus.changes
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
      // Set Space ID.
      resolvedSubResponse.data = {
        space_id: requestData._id,
      };

      resolvedSubResponse.message = createMessage('success');
      break;

    default:
      break;
  }
};

export { resolveSpace };

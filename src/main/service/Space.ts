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

// Constant String.
const { MSG_CODE } = CONSTANT;
const { ENDPOINT } = CONSTANT.IPC;

// Constant Message String.
const MSG_STR = {
  SPACE_ADD_SUCCESS: {
    FUNC: (spaceName: string) => `"${spaceName}" Space added successfully.`,
  },
  SPACE_ADD_FAILED: {
    FUNC: (spaceName: string) => `Error while adding "${spaceName}" Space !`,
  },
};

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

      resolvedSubResponse.message = createMessage(MSG_CODE.SUCCESS);
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
            MSG_CODE.SUCCESS,
            MSG_STR.SPACE_ADD_SUCCESS.FUNC(requestData.space_name)
          )
        : // Error while adding Space.
          createMessage(
            MSG_CODE.ERR_SERVER,
            MSG_STR.SPACE_ADD_FAILED.FUNC(requestData.space_name)
          );

      break;

    case ENDPOINT.GET_SPACE:
      // Set Space ID.
      resolvedSubResponse.data = {
        space_id: requestData._id,
      };

      resolvedSubResponse.message = createMessage(MSG_CODE.SUCCESS);
      break;

    default:
      break;
  }
};

export { resolveSpace };

/**
 * index.ts
 *
 * Description:
 *    Resolving request received on main processs and returning response.
 *
 */

import { CONSTANT, createMessage } from '../../common';
import { resolveURI } from '../util';
import { resolveAuth } from './Auth';
import { resolveAuthPin } from './AuthPin';
import { resolveCredential } from './Credential';
import { resolveNote } from './Note';
import { resolveSpace } from './Space';

// Constant Endpoint String.
const { ENDPOINT } = CONSTANT;

/**
 * This functions resolves all the request received from renderer on main process.
 *
 * @param request
 * @returns {IPCResponseObject} IPC Response Object to be sent to renderer process.
 */
const resolveRequest = (request: IPCRequestInterface): IPCResponseInterface => {
  const resolvedSubRequest: SubRequestResponseType = {
    data: undefined,
    message: undefined,
  };

  // Resolve Request URI
  const requestSubURI: string[] = resolveURI(request.URI);

  switch (requestSubURI[0]) {
    case ENDPOINT.AUTH:
      resolveAuth(
        requestSubURI,
        request.data as AuthRequestType,
        resolvedSubRequest
      );
      break;

    case ENDPOINT.AUTH_PIN:
      const requestData = request.data as AuthPinRequestType;

      if (requestData.l_pin != undefined)
        resolveAuthPin(requestSubURI, requestData, resolvedSubRequest);

      if (
        requestData.data != undefined &&
        (requestData.l_pin == undefined ||
          resolvedSubRequest.message?.status == 200)
      )
        resolveCredential(
          [``, ENDPOINT.GET],
          request.data as CredentialRequestType,
          resolvedSubRequest
        );
      break;

    case ENDPOINT.SPACES:
      resolveSpace(
        requestSubURI,
        request.data as SpaceRequestType,
        resolvedSubRequest
      );

      if (
        requestSubURI[1] === ENDPOINT.GET_SPACE &&
        resolvedSubRequest.data != undefined
      ) {
        // Update Sub Request URI.
        requestSubURI[1] = ENDPOINT.GET_ALL;

        // Populate Notes for respective Space
        resolveNote(requestSubURI, {} as NoteRequestType, resolvedSubRequest);

        // Populate Credentials for respective Space
        resolveCredential(
          requestSubURI,
          {} as CredentialRequestType,
          resolvedSubRequest
        );
      }
      break;

    case ENDPOINT.NOTES:
      resolveNote(
        requestSubURI,
        request.data as NoteRequestType,
        resolvedSubRequest
      );
      break;

    case ENDPOINT.CREDENTIAL:
      resolveCredential(
        requestSubURI,
        request.data as CredentialRequestType,
        resolvedSubRequest
      );
      break;

    default:
      break;
  }

  // If message is still undefined then throw client error.
  if (resolvedSubRequest.message == undefined)
    resolvedSubRequest.message = createMessage(
      'client-error',
      'Invalid Request'
    );

  return {
    URI: request.URI,
    timestamp: request.timestamp,
    data: resolvedSubRequest.data,
    status: resolvedSubRequest.message.status,
    message: resolvedSubRequest.message.message,
  };
};

export default resolveRequest;

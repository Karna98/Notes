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
const resolveIpcRequest = (
  request: IPCRequestInterface
): IPCResponseInterface => {
  const resolvedSubResponse: SubRequestResponseType = {
    data: undefined,
    message: undefined,
  };

  // Resolve Request URI
  const requestURI: string[] = resolveURI(request.URI);

  switch (requestURI[0]) {
    case ENDPOINT.AUTH:
      resolveAuth(
        requestURI,
        resolvedSubResponse,
        request.data as AuthRequestType
      );
      break;

    case ENDPOINT.AUTH_PIN:
      const requestData = request.data as AuthPinRequestType;

      if (requestData.l_pin != undefined)
        resolveAuthPin(requestURI, resolvedSubResponse, requestData);

      if (
        requestData.data != undefined &&
        (requestData.l_pin == undefined ||
          resolvedSubResponse.message?.status == 200)
      )
        resolveCredential(
          [``, ENDPOINT.GET],
          resolvedSubResponse,
          request.data as CredentialRequestType
        );
      break;

    case ENDPOINT.SPACES:
      resolveSpace(
        requestURI,
        resolvedSubResponse,
        request.data as SpaceRequestType
      );

      if (
        requestURI[1] === ENDPOINT.GET_SPACE &&
        resolvedSubResponse.data != undefined
      ) {
        // Update Sub Request URI.
        requestURI[1] = ENDPOINT.GET_ALL;

        // Populate Notes for respective Space
        resolveNote(requestURI, resolvedSubResponse, {} as NoteRequestType);

        // Populate Credentials for respective Space
        resolveCredential(
          requestURI,
          resolvedSubResponse,
          {} as CredentialRequestType
        );
      }
      break;

    case ENDPOINT.NOTES:
      resolveNote(
        requestURI,
        resolvedSubResponse,
        request.data as NoteRequestType
      );
      break;

    case ENDPOINT.CREDENTIAL:
      resolveCredential(
        requestURI,
        resolvedSubResponse,
        request.data as CredentialRequestType
      );
      break;

    default:
      break;
  }

  // If message is still undefined then throw client error.
  if (resolvedSubResponse.message == undefined)
    resolvedSubResponse.message = createMessage(
      'client-error',
      'Invalid Request'
    );

  return {
    URI: request.URI,
    timestamp: request.timestamp,
    data: resolvedSubResponse.data,
    status: resolvedSubResponse.message.status,
    message: resolvedSubResponse.message.message,
  };
};

export default resolveIpcRequest;

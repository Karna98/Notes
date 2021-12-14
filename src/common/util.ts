/**
 * util.ts
 *
 * Description:
 *    Common Support Functions for main and renderer process.
 *
 */

import { getStatusCode } from './status-codes';

/**
 * @NOTE :
 *     Needs to be declare so that React Components can detect window.NotesAPI and does not throw error on opening the application.
 */
declare global {
  interface Window {
    NotesAPI: contextBridgeAPI;
  }
}

/**
 * Returns IPC Request Object to be sent to main process.
 *
 * @param URI URI String.
 * @param data Payload.
 * @returns {object}
 */
const IPCRequestObject = (
  URI: string,
  data?: unknown | object
): IPCRequestInterface => {
  return {
    URI,
    timestamp: Date.now(),
    data,
  };
};

/**
 * Returns IPC Response Object to be sent to renderer process.
 *
 * @param URI URI String received from renderer process.
 * @param timestamp Timestamp of  renderer's IPCRequestObject.
 * @param messageObject Request Fulfillment status and message.
 * @param data Payload.
 * @returns {object}
 */
const IPCResponseObject = (
  URI: string,
  timestamp: number,
  messageObject: MessageInterface,
  data?: unknown | object
): IPCResponseInterface => {
  const { status, message } = messageObject;
  return {
    URI,
    timestamp,
    status,
    data,
    message,
  };
};

/**
 * Return object implementing MessageInterface.
 *
 * @param status Status Code.
 * @param message Status Message.
 * @returns {object}
 */
const createMessage = (
  status: string | number,
  message?: string
): MessageInterface => ({
  status: typeof status === 'number' ? status : getStatusCode(status),
  message,
});

export { createMessage, IPCRequestObject, IPCResponseObject };

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
    NotesAPI: ContextBridgeInterface;
  }
}

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

export { createMessage };

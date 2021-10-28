/**
 * interface.d.ts
 *
 * Description:
 *    Declaring Interface to be use across project.
 *
 */

export interface contextBridgeAPI {
  send: (channel: string, data: string) => Promise<void>;
  receive: (channel: string, func: unknown) => Promise<void>;
}

/**
 * @NOTE :
 *     Needs to be declare so that React Components can detect window.NotesAPI and does not throw error on opening the application.
 */
declare global {
  interface Window {
    NotesAPI: contextBridgeAPI;
  }
}

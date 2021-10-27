export interface contextBridgeAPI {
  send: (channel: string, data: string) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  receive: (channel: string, func: Function) => Promise<void>;
}

declare global {
  interface Window {
    NotesAPI: contextBridgeAPI;
  }
}

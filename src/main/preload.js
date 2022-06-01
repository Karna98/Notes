/**
 * preload.js
 *
 * Description:
 *    This file provides the renderer process to communicate with Electron's Main process securely. Read more at
 *    https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
 *
 */

const { contextBridge, ipcRenderer } = require('electron');

const WINDOW_API_NAME = `NotesAPI`;

// IPC Channel BUS
const ALLOWED_CHANNEL_BUS = {
  TO: [`toMain`],
  FROM: [`fromMain`],
};

const send = (channel, data) => {
  // whitelist channels
  if (ALLOWED_CHANNEL_BUS.TO.includes(channel)) {
    ipcRenderer.send(channel, data);
  }
};

const receive = (channel, func) => {
  if (ALLOWED_CHANNEL_BUS.FROM.includes(channel)) {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on(channel, (_event, ...args) => func(...args));
  }
};

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(WINDOW_API_NAME, {
  send,
  receive,
});

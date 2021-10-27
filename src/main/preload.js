/**
 * preload.js
 *
 * Description:
 *    This file provides the renderer process to use restricted node.js API's
 *    securely. Read more at
 *    https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
 *
 */

const { contextBridge, ipcRenderer } = require('electron');

const send = (channel, data) => {
  // whitelist channels
  const validChannels = ['toMain'];
  if (validChannels.includes(channel)) {
    ipcRenderer.send(channel, data);
  }
};

const receive = (channel, func) => {
  const validChannels = ['fromMain'];
  if (validChannels.includes(channel)) {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on(channel, (_event, ...args) => func(...args));
  }
};

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('NotesAPI', {
  send,
  receive,
});

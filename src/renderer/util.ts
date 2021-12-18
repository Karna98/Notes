/**
 * util.ts
 *
 * Description:
 *    Utility function for Electron's renderer process.
 *
 */

/**
 * Sends data to Main Process.
 *
 * @param object
 */
const sendToIpcMain = (data: IPCRequestInterface) => {
  try {
    window.NotesAPI.send(`toMain`, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

/*
  Browser Session or Local Storage.

  @NOTE: To be used in Development Mode only
  1. On Refresh react states are not persisted, so to handle session, we will be storing it in browser's session storage.
*/

const BROWSER_STORE = `NOTES`;

/**
 * Get value from browser storage.
 *
 * @param type Type of Browser storage: session Storge or local storage.
 * @returns {null | object} Value stored in browser storage.
 */
const getValue = (type: 'local' | 'session') => {
  let value: string | null = null;

  if (process.env.NODE_ENV === 'development')
    switch (type) {
      case 'local':
        value = window.localStorage.getItem(BROWSER_STORE);
        break;
      case 'session':
        value = window.sessionStorage.getItem(BROWSER_STORE);
        break;
    }
  return value == null ? null : JSON.parse(value);
};

/**
 * Set value from browser storage.
 *
 * @param type Type of Browser Storage: session storge or local storage.
 * @param value Value to be stored in BrowserStorage.
 */
const setValue = (type: 'local' | 'session', value: object) => {
  if (process.env.NODE_ENV === 'development')
    switch (type) {
      case 'local':
        window.localStorage.setItem(BROWSER_STORE, JSON.stringify(value));
        break;
      case 'session':
        window.sessionStorage.setItem(BROWSER_STORE, JSON.stringify(value));
        break;
    }
};

const browserStorage = { getValue, setValue };

export { sendToIpcMain, browserStorage };

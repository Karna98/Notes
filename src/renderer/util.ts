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

  @NOTE: To be used in Development Mode only.
  1. On page refresh, react states do not persists. So to make session store persists, we will be storing session in browser's session storage.
*/

const BROWSER_STORE = `NOTES`;

/**
 * Get value from browser storage.
 *
 * @param type Type of Browser storage: session Storge or local storage.
 * @returns {null | object} Value stored in browser storage.
 * @param STORE_NAME Custom key name to be stored in browser storage.
 */
const getValue = (type: 'local' | 'session', STORE_NAME = BROWSER_STORE) => {
  let value: string | null = null;

  if (process.env.NODE_ENV === 'development')
    switch (type) {
      case 'local':
        value = window.localStorage.getItem(STORE_NAME);
        break;
      case 'session':
        value = window.sessionStorage.getItem(STORE_NAME);
        break;
    }
  return value == null ? null : JSON.parse(value);
};

/**
 * Set value from browser storage.
 *
 * @param type Type of Browser Storage: session storge or local storage.
 * @param value Value to be stored in BrowserStorage.
 * @param STORE_NAME Custom key name to be stored in browser storage.
 */
const setValue = (
  type: 'local' | 'session',
  value: object,
  STORE_NAME = BROWSER_STORE
) => {
  if (process.env.NODE_ENV === 'development')
    switch (type) {
      case 'local':
        window.localStorage.setItem(STORE_NAME, JSON.stringify(value));
        break;
      case 'session':
        window.sessionStorage.setItem(STORE_NAME, JSON.stringify(value));
        break;
    }
};

/**
 * Remove item from browser storage.
 *
 * @param type Type of Browser Storage: session storge or local storage.
 * @param STORE_NAME Custom key name to be stored in browser storage.
 */
const removeItem = (type: 'local' | 'session', STORE_NAME = BROWSER_STORE) => {
  if (process.env.NODE_ENV === 'development')
    switch (type) {
      case 'local':
        window.localStorage.removeItem(STORE_NAME);
        break;
      case 'session':
        window.sessionStorage.removeItem(STORE_NAME);
        break;
    }
};

const browserStorage = { getValue, setValue, removeItem };

export { sendToIpcMain, browserStorage };

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

export { sendToIpcMain };

// Sends data to Main Process on button Click
export const sendToIpcMain = (object: object) => {
  try {
    window.NotesAPI.send(`toMain`, JSON.stringify(object));
  } catch (error) {
    console.log(error);
  }
};

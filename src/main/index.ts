/*-----     -----     -----     -----     -----     -----     -----     ----- 
index.tsx

Description: Main process file for ELectron. Entry file for ELectron.

Version  : 0.0.1
Date     : 10-10-2021 
Author   : Vedant Wakalkar 
Email    : developer.karna98@gmail.com 
-----     -----     -----     -----     -----     -----     -----     -----*/

// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron';
import { join as pathJoin } from 'path';

const APP_DIRECTORY = app.getAppPath();
const BUILD_DIRECTORY = pathJoin(APP_DIRECTORY, `build`);

/*
  TODO: Find if we still need to keep global reference (read below cooments) when we create window using Class.
  
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  // let mainWindow: any; 
*/

class Main {
  private mainWindow!: Electron.BrowserWindow;

  public init() {
    app.on('ready', this.createWindow);

    // Emitted when the window is closed.
    app.on('window-all-closed', this.onWindowAllClosed);

    app.on('activate', this.onActivate);
  }

  private onWindowAllClosed() {
    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private onActivate() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (BrowserWindow.getAllWindows().length === 0) this.createWindow();
    if (!this.mainWindow) {
      this.createWindow();
    }
  }

  private createWindow() {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.

    // Main Window
    this.mainWindow = new BrowserWindow({
      minWidth: 800,
      minHeight: 600,
      center: true,
      show: false,
      webPreferences: {
        // devTools: false,
        contextIsolation: true, // protect against prototype pollution
        // preload: path to preload,
      },
      // icon: link to icon
    });

    // Disable Window menu
    // this.mainWindow.setMenu(null);

    // Open Devtools
    // this.mainWindow.webContents.openDevTools();

    this.mainWindow.loadURL(
      pathJoin(BUILD_DIRECTORY, `renderer`, `index.html`)
    );

    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
    });
  }
}

new Main().init();

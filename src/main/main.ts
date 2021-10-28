/**
 * main.ts
 *
 * Description:
 *    Main process file for ELectron. Entry file for ELectron.
 *
 */

// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from 'electron';
import { join as pathJoin } from 'path';
import { resolveHtmlPath } from './util';

/*
  @TODO: Find if we still need to keep global reference (read below cooments) when we create window using Class.
  
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  // let mainWindow: any; 
*/

const isDevelopmentMode = process.env.NODE_ENV === `development`;

class Main {
  private launchWindow!: Electron.BrowserWindow | null;
  private mainWindow!: Electron.BrowserWindow | null;

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

    const launcherWindow = () => {
      // Launch Window
      this.launchWindow = new BrowserWindow({
        width: 300,
        height: 300,
        center: true,
        frame: false,
        transparent: true,
        show: false,
        resizable: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        webPreferences: {
          // devTools can work in DEVELOPMENT mode
          devTools: false || isDevelopmentMode,
        },
      });

      this.launchWindow.loadURL(resolveHtmlPath(`launch.html`));

      this.launchWindow?.show();

      // Open Devtools
      // this.launchWindow.webContents.openDevTools();
    };

    // Main Window
    this.mainWindow = new BrowserWindow({
      minWidth: 800,
      minHeight: 600,
      center: true,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true, // protect against prototype pollution
        devTools: false || isDevelopmentMode,
        preload: pathJoin(__dirname, 'preload.js'),
      },
      // icon: link to icon
    });

    if (!isDevelopmentMode)
      // Disable Window menu in PRODUCTION Mode
      this.mainWindow.setMenu(null);

    // Open Devtools
    // this.mainWindow.webContents.openDevTools();

    this.mainWindow.loadURL(resolveHtmlPath(`index.html`));

    this.mainWindow.once('ready-to-show', () => {
      if (!isDevelopmentMode) {
        // Only PRODUCTION Mode
        launcherWindow();

        setTimeout(() => {
          this.launchWindow?.destroy();
          this.launchWindow = null;

          setTimeout(() => {
            this.mainWindow?.show();
          }, 250);
        }, 2000);
      } else {
        this.mainWindow?.show();
      }
    });

    ipcMain.on('toMain', (_event: Electron.IpcMainEvent, args: string) => {
      const getTime = () => {
        const currentTime = new Date();
        return `[${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}] MAIN PROCESS : `;
      };

      console.log(`${getTime()} Receviced from RENDERER Process - ${args}`);

      console.log(`${getTime()} Getting Environment ...`);

      const getEnvironment = process.env.NODE_ENV;

      console.log(`${getTime()} Sending Response to RENDERER process`);

      this?.mainWindow?.webContents.send(
        `fromMain`,
        JSON.stringify({ getEnvironment })
      );
    });
  }
}

new Main().init();

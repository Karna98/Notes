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
import CONSTANT from '../common/constant';
import CONFIG from './config';
import resolveRequest from './resolve';
import { resolveHtmlPath } from './util';

/*
  @TODO: Find if we still need to keep global reference (read below cooments) when we create window using Class.
  
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  // let mainWindow: any; 
*/

class Main {
  private launchWindow: Electron.BrowserWindow | null = null;
  private mainWindow: Electron.BrowserWindow | null = null;

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
          devTools: false || CONFIG.IS_DEVELOPMENT_MODE,
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
        devTools: false || CONFIG.IS_DEVELOPMENT_MODE,
        preload: pathJoin(__dirname, 'preload.js'),
      },
      icon: pathJoin(CONFIG.PATH.ASSETS, `logo`, `png`, `256x256.png`),
    });

    if (!CONFIG.IS_DEVELOPMENT_MODE)
      // Disable Window menu in PRODUCTION Mode
      this.mainWindow.setMenu(null);

    // Open Devtools
    // this.mainWindow.webContents.openDevTools();

    this.mainWindow.loadURL(resolveHtmlPath(`index.html`));

    this.mainWindow.once('ready-to-show', () => {
      if (!CONFIG.IS_DEVELOPMENT_MODE) {
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

    ipcMain.on(
      CONSTANT.CHANNEL_BUS.TO[0],
      (_event: Electron.IpcMainEvent, args: string) => {
        const responseObject = resolveRequest(JSON.parse(args));

        if (responseObject != null) {
          // If Response object is created, send it as response
          this?.mainWindow?.webContents.send(
            CONSTANT.CHANNEL_BUS.FROM[0],
            JSON.stringify(responseObject)
          );
        }
      }
    );
  }
}

new Main().init();

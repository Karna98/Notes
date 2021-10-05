/*-----     -----     -----     -----     -----     -----     -----     ----- 
main.js

Description: Entry file for ELectron. This is the main process file.

Version  : 0.0.1
Date     : 06-10-2021 
Author   : Vedant Wakalkar 
Email    : developer.karna98@gmail.com 
-----     -----     -----     -----     -----     -----     -----     -----*/

const { app, BrowserWindow } = require("electron");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
        },
    });

    // Load app
    win.loadFile(path.join(__dirname, "index.html"));
}

app.on("ready", createWindow);

'use strict';

const path = require('path');
const { app, BrowserWindow } = require('electron');
require('electron-reload')(__dirname);

function main() {

  // create new window
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 800,
    height: 600,
  })

  // Otwieranie narzędzi deweloperskich
  mainWindow.webContents.openDevTools();
  // load app/index.html as the window content
  mainWindow.loadFile(path.join('app', 'index.html'));

}

app.on('ready', main);

app.on('window-all-closed', function () {
  app.quit();
});
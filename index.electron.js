'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

let mainWindow = null;

app.on('ready', function init() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
  });
  mainWindow.loadURL(path.join('file://', __dirname, 'dist-dev/electron/index.html'));
  mainWindow.webContents.openDevTools();
});
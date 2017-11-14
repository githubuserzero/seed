'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

let mainWindow = null;

app.on('ready', function init() {
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset=UTF-8>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="html-app.css?1"/>
    <title>Title...</title>
  </head>
  
  <body>
    <div id="app"></div>
    
    <script src="init.js"></script>
    <script src="html-app.js"></script>
  </body>
</html>
  `;
  
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
  });
  mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURI(html), {
    baseURLForDataURL: path.join('file://', __dirname, 'dist-dev/electron/'),
  });
  mainWindow.webContents.openDevTools();
});
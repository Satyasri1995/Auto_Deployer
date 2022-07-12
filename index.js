const electron = require("electron");

const path = require("path");
const AppTray = require("./electron/AppTray");
const MainWindow = require("./electron/MainWindow");
const Operations = require("./electron/Operations");

const { app, ipcMain } = electron;

let mainWindow;
let tray;
let operations = new Operations();
const htmlPath = path.join(__dirname, "./build/index.html");
const options = {
  width: 750,
  height: 450,
  frame: true,
  show: true,
  resizable: true,
  webPreferences: {
    backgroundThrottling: false,
    preload:path.join(__dirname,'./electron/preload.js')
  },
};

app.on("ready", () => {
  console.log(htmlPath);
  mainWindow = new MainWindow(options, htmlPath);
  const iconPath = path.join(__dirname, "./electron/assets/electron.png");
  tray = new AppTray(iconPath, mainWindow);
  operations.checkDataBase();
});

ipcMain.handle("add", operations.addHandler);
ipcMain.handle("remove",operations.removeHandler);
ipcMain.handle("update",operations.updateHandler);
ipcMain.handle("fetch",operations.fetchHandler);
ipcMain.handle("build",operations.buildHandler);
ipcMain.handle("deploy",operations.deployHandler);
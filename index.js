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
    nodeIntegration: true,
    contextIsolation: false
  },
};

app.on("ready", () => {
  console.log(htmlPath);
  mainWindow = new MainWindow(options, htmlPath);
  const iconPath = path.join(__dirname, "./electron/assets/electron.png");
  tray = new AppTray(iconPath, mainWindow);
  operations.checkDataBase();
});

ipcMain.on("add", operations.addHandler);
ipcMain.on("remove",operations.removeHandler);
ipcMain.on("update",operations.updateHandler);
ipcMain.on("remove",operations.removeHandler);
ipcMain.on("fetch",operations.fetchHandler);
ipcMain.on("build",operations.buildHandler);
ipcMain.on("deploy",operations.deployHandler);
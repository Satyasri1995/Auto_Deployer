const { Menu } = require("electron");
const electron = require("electron");

const path = require("path");
const AppTray = require("./electron/AppTray");
const MainWindow = require("./electron/MainWindow");
const Operations = require("./electron/Operations");
const {getAppOptions,getMainMenu} = require('./electron/Options');
const { app, ipcMain } = electron;

let mainWindow;
let tray;
let mainMenu;
let operations = new Operations();
const htmlPath = path.join(__dirname, "./build/index.html");


app.on("ready", () => {
  mainWindow = new MainWindow(getAppOptions(path), htmlPath);
  mainWindow.setTitle("Auto Deployer");
  mainMenu=Menu.buildFromTemplate(getMainMenu(app,mainWindow));
  Menu.setApplicationMenu(mainMenu);
  const iconPath = path.join(__dirname, "./electron/assets/electron.png");
  tray = new AppTray(iconPath, mainWindow);
  operations.checkDataBase();
});

ipcMain.handle("add", operations.addHandler);
ipcMain.handle("remove", operations.removeHandler);
ipcMain.handle("update", operations.updateHandler);
ipcMain.handle("fetch", operations.fetchHandler);
ipcMain.on("build", operations.buildHandler);
ipcMain.handle("build_success_log", operations.buildSuccessLogHandler);
ipcMain.handle("build_error_log", operations.buildErrorLogHandler);
ipcMain.on("deploy", operations.deployHandler);
ipcMain.handle("deploy_success_log", operations.deploySuccessLogHandler);
ipcMain.handle("deploy_error_log", operations.deployErrorLogHandler);

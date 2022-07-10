const electron = require("electron");

const path = require("path");
const AppTray = require("./electron/AppTray");
const MainWindow = require("./electron/MainWindow");

const { app } = electron;

let mainWindow;
let tray;
const htmlPath = path.join(__dirname,"./build/index.html");
const options={
    width:750,
    height:450,
    frame:true,
    show:true,
    resizable:true,
    webPreferences:{
        backgroundThrottling:false
    }
}

app.on('ready',()=>{
    console.log(htmlPath)
    mainWindow = new MainWindow(options,htmlPath);
    const iconPath = path.join(__dirname,"./electron/assets/electron.png");
    tray=new AppTray(iconPath,mainWindow);
})
const Operations = require("./Operations")


const getAppOptions=(path)=>{
    return {
        width: 850,
        height: 500,
        frame: true,
        show: true,
        resizable: true,
        skipTaskbar: true,
        movable: true,
        webPreferences: {
          backgroundThrottling: false,
          preload: path.join(__dirname, "preload.js"),
        },
      }
}

const getMainMenu=(app,mainWindow)=>{
    return [
        {
          label: "App",
          submenu: [
            { 
              label: "Reload" ,
              click(){mainWindow.reload()},
              accelarator:'CmsOrCtrl+R'
            },
            {
              label:'Quit',
              click(){app.quit()},
              accelarator:'CmsOrCtrl+Q'
            },
            {
              label:'DevTools',
              click(){mainWindow.webContents.openDevTools()},
              accelarator:'f5'
            },
            {
              label:'Clear Logs',
              click(){new Operations().clearLogs()},
              accelarator:'CmsOrCtrl+C+L'
            },
          ],
        }
      ]
}

module.exports = {getAppOptions,getMainMenu}


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
              click(){app.relaunch()},
              accelarator:'Ctrl+R'
            },
            {
              label:'Quit',
              click(){app.quit()},
              accelarator:'Ctrl+Q'
            },
            {
              label:'DevTools',
              click(){mainWindow.webContents.openDevTools()},
              accelarator:'f5'
            }
          ],
        },
        {
          label:'Logs',
          submenu:[
            {
              label:'Clear Logs',
              click(){},
              accelarator:'Ctrl+C+L'
            },
            {
              label:'Clear Build Logs',
              click(){},
              accelarator:'Ctrl+B+L'
            },
            {
              label:'Clear Deploy Logs',
              click(){},
              accelarator:'Ctrl+D+L'
            }
          ]
        },
      ]
}

module.exports = {getAppOptions,getMainMenu}
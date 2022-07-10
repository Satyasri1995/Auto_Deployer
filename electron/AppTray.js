const electron = require("electron");
const { Menu, Tray, app } = electron;

class AppTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.setToolTip("AutoDeployer");
    this.setImage(iconPath);
    this.mainWindow = mainWindow;
    this.on("click", () => {
      if (this.mainWindow.isVisible()) {
        this.mainWindow.hide();
      } else {
        this.mainWindow.show();
      }
    });
    this.on("right-click", () => {
      const menuConfig = Menu.buildFromTemplate([
        { label: "Quit App", click: () => app.quit() },
      ]);
      this.popUpContextMenu(menuConfig);
    });
  }
}

module.exports = AppTray;

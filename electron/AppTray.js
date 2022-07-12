const electron = require("electron");
const { Menu, Tray, app } = electron;

class AppTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.setToolTip("AutoDeployer");
    this.setImage(iconPath);
    this.mainWindow = mainWindow;
    this.on("click", this.onClick.bind(this));
    this.on("right-click", this.onRightClick.bind(this));
  }

  onRightClick=() => {
    const menuConfig = Menu.buildFromTemplate([
      { label: "Quit App", click: () => app.quit() },
    ]);
    this.popUpContextMenu(menuConfig);
  }

  onClick=() => {
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.show();
    }
  }
}

module.exports = AppTray;

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  add: (data) => ipcRenderer.invoke("add", data),
  remove: (data) => ipcRenderer.invoke("remove", data),
  update: (data) => ipcRenderer.invoke("update", data),
  fetch: () => ipcRenderer.invoke("fetch"),
  build: (data) => ipcRenderer.invoke("build", data),
  deploy: (data) => ipcRenderer.invoke("deploy", data),
});

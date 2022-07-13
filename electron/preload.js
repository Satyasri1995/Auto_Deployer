const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  add: (data) => ipcRenderer.invoke("add", data),
  remove: (data) => ipcRenderer.invoke("remove", data),
  update: (data) => ipcRenderer.invoke("update", data),
  fetch: () => ipcRenderer.invoke("fetch"),
  build: (data) => ipcRenderer.send("build", data),
  build_success_log:(data)=>ipcRenderer.invoke('build_success_log',data),
  build_error_log:(data)=>ipcRenderer.invoke('build_error_log',data),
  status: (cb) => ipcRenderer.on("status", cb),
  deploy: (data) => ipcRenderer.invoke("deploy", data),
});

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  add: (data) => ipcRenderer.invoke("add", data),
  remove: (data) => ipcRenderer.invoke("remove", data),
  update: (data) => ipcRenderer.invoke("update", data),
  fetch: () => ipcRenderer.invoke("fetch"),
  fetchCategories: () => ipcRenderer.invoke("fetchCategories"),
  build: (data) => ipcRenderer.send("build", data),
  build_success_log:(data)=>ipcRenderer.invoke('build_success_log',data),
  build_error_log:(data)=>ipcRenderer.invoke('build_error_log',data),
  status: (cb) => ipcRenderer.on("status", cb),
  deploy: (data) => ipcRenderer.send("deploy", data),
  deploy_success_log:(data)=>ipcRenderer.invoke('deploy_success_log',data),
  deploy_error_log:(data)=>ipcRenderer.invoke('deploy_error_log',data),
  filter:(data)=>ipcRenderer.invoke('filter',data)
});

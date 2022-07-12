const Project = require("./Project");
const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "electronDB.dat");
const electron = require('electron')
const { ipcMain } = electron;

class Operations{
    checkDataBase =  () => {
        const isDbExist =  fs.existsSync(dbPath);
        if (!isDbExist) {
           fs.writeFileSync(dbPath, JSON.stringify([]));
        }
      };
      
      addHandler =  (__event, data) => {
        const parsedData = JSON.parse(data);
        const project = new Project(parsedData);
        project.projectId = require("crypto").randomBytes(16).toString("hex");
        const rawData =  fs.readFileSync(dbPath);
        const parsedDb = JSON.parse(rawData);
        const projects = parsedDb.map((item) => new Project(item));
        projects.push(project);
        const strProjects = JSON.stringify(projects);
        const updatingDb =  fs.writeFileSync(dbPath, strProjects);
        if (updatingDb) {
          ipcMain.emit("fetchData", strProjects);
        } else {
          ipcMain.emit("error", "something went wrong");
        }
      };
      
      removeHandler =  (__event, data) => {
        const parsedData = JSON.parse(data);
        const project = new Project(parsedData);
        const rawData =  fs.readFileSync(dbPath);
        const parsedDb = JSON.parse(rawData);
        let projects = parsedDb.map((item) => new Project(item));
        projects = projects.filter((item) => item.projectId !== project.projectId);
        const strProjects = JSON.stringify(projects);
        const updatingDb =  fs.writeFileSync(dbPath, strProjects);
        if (updatingDb) {
          ipcMain.emit("fetchData", strProjects);
        } else {
          ipcMain.emit("error", "something went wrong");
        }
      };
      
      updateHandler =  (__event, data) => {
        const parsedData = JSON.parse(data);
        const project = new Project(parsedData);
        const rawData =  fs.readFileSync(dbPath);
        const parsedDb = JSON.parse(rawData);
        let projects = parsedDb.map((item) => new Project(item));
        const pId = projects.findIndex((item) => item.projectId === project.projectId);
        if(pId>=0){
          projects[pId]=project;
        }
        const strProjects = JSON.stringify(projects);
        const updatingDb =  fs.writeFileSync(dbPath, strProjects);
        if (updatingDb) {
          ipcMain.emit("fetchData", strProjects);
        } else {
          ipcMain.emit("error", "something went wrong");
        }
      };
      
      fetchHandler =  (__event) => {
        const rawData =  fs.readFileSync(dbPath);
        const parsedDb = JSON.parse(rawData);
        const projects = parsedDb.map((item) => new Project(item));
        const strProjects = JSON.stringify(projects);
        ipcMain.emit("fetchData", strProjects);
      };
      
      buildHandler = (event, data) => {};
      
      deployHandler = (event, data) => {};
}

module.exports=Operations;


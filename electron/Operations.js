const Project = require("./Project");
const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname,'..' ,"electronDB.dat");


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
        fs.writeFileSync(dbPath, strProjects);
        return strProjects
      };
      
      removeHandler =  (__event, data) => {
        const parsedData = JSON.parse(data);
        const project = new Project(parsedData);
        const rawData =  fs.readFileSync(dbPath);
        const parsedDb = JSON.parse(rawData);
        let projects = parsedDb.map((item) => new Project(item));
        projects = projects.filter((item) => item.projectId !== project.projectId);
        const strProjects = JSON.stringify(projects);
        fs.writeFileSync(dbPath, strProjects);
        return strProjects;
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
        fs.writeFileSync(dbPath, strProjects);
        return strProjects;
      };
      
      fetchHandler =  (__event) => {
        const rawData =  fs.readFileSync(dbPath);
        const parsedDb = JSON.parse(rawData);
        const projects = parsedDb.map((item) => new Project(item));
        const strProjects = JSON.stringify(projects);
        return strProjects;
      };
      
      buildHandler = (event, data) => {};
      
      deployHandler = (event, data) => {};
}

module.exports=Operations;


const Project = require("./Project");
const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "..", "electronDB.dat");
const logsBuildPath = path.join(__dirname, "..", "logs", "build");
const logsDeployPath = path.join(__dirname, "..", "logs", "deploy");
const cmd = require("node-cmd");

class Operations {
  checkDataBase = () => {
    const isDbExist = fs.existsSync(dbPath);
    const islogsBuildPathExists = fs.existsSync(logsBuildPath);
    const logsDeployPathExists = fs.existsSync(logsDeployPath);
    if (!isDbExist) {
      fs.writeFileSync(dbPath, JSON.stringify([]));
    }
    if (!islogsBuildPathExists) {
      fs.mkdirSync(logsBuildPath, { recursive: true });
    }
    if (!logsDeployPathExists) {
      fs.mkdirSync(logsDeployPath, { recursive: true });
    }
  };

  addHandler = (__event, data) => {
    const parsedData = JSON.parse(data);
    const project = new Project(parsedData);
    project.projectId = require("crypto").randomBytes(16).toString("hex");
    const rawData = fs.readFileSync(dbPath);
    const parsedDb = JSON.parse(rawData);
    const projects = parsedDb.map((item) => new Project(item));
    projects.push(project);
    const strProjects = JSON.stringify(projects);
    fs.writeFileSync(dbPath, strProjects);
    return strProjects;
  };

  removeHandler = (__event, data) => {
    const parsedData = JSON.parse(data);
    const project = new Project(parsedData);
    const rawData = fs.readFileSync(dbPath);
    const parsedDb = JSON.parse(rawData);
    let projects = parsedDb.map((item) => new Project(item));
    projects = projects.filter((item) => item.projectId !== project.projectId);
    const strProjects = JSON.stringify(projects);
    fs.writeFileSync(dbPath, strProjects);
    return strProjects;
  };

  updateHandler = (__event, data) => {
    const parsedData = JSON.parse(data);
    const project = new Project(parsedData);
    const rawData = fs.readFileSync(dbPath);
    const parsedDb = JSON.parse(rawData);
    let projects = parsedDb.map((item) => new Project(item));
    const pId = projects.findIndex(
      (item) => item.projectId === project.projectId
    );
    if (pId >= 0) {
      projects[pId] = project;
    }
    const strProjects = JSON.stringify(projects);
    fs.writeFileSync(dbPath, strProjects);
    return strProjects;
  };

  fetchHandler = (__event) => {
    const rawData = fs.readFileSync(dbPath);
    const parsedDb = JSON.parse(rawData);
    const projects = parsedDb.map((item) => new Project(item));
    const strProjects = JSON.stringify(projects);
    return strProjects;
  };

  buildHandler = (event, data) => {
    const rawData = fs.readFileSync(dbPath);
    const parsedDb = JSON.parse(rawData);
    const projects = parsedDb.map((item) => new Project(item));
    let project = new Project(JSON.parse(data));
    let success_log="";
    let error_log="";
    let cmdString = `cd ${project.projectPath} && npm run ng build ${
      project.isProd ? "--prod" : ""
    } --configuration=${project.configuration} --base-href=${project.baseHref}`;
    let cmdProcess = cmd.run(cmdString);
    cmdProcess.stdout.on("data", (data) => {
      project.isBuilding = true;
      project.status = "info";
      project.statusMessage = `Build in-progress please check log file => ${project.projectId}_build.log`;
      project.isBuildSuccess = false;
      success_log=success_log+data+"\n";
      event.reply("status", JSON.stringify(project));
    });
    cmdProcess.stdout.on("end", () => {
      project.isBuilding = false;
      project.status = "info";
      project.statusMessage = `Build completed please check log file => ${project.projectId}_build.log`;
      project.isBuildSuccess = true;
      project.buildDate = new Date();
      let pId = projects.findIndex(
        (item) => item.projectId === project.projectId
      );
      if (pId >= 0) {
        projects[pId] = project;
      }
      const strProjects = JSON.stringify(projects);
      fs.writeFileSync(dbPath, strProjects);
      let logPath = path.join(
        __dirname,
        "..",
        "logs",
        "build",
        `${project.projectId}_success.log`
      );
      fs.writeFileSync(logPath, success_log);
      event.reply("status", JSON.stringify(project));
    });
    cmdProcess.stderr.on("data", (error) => {
      let logPath = path.join(
        __dirname,
        "..",
        "logs",
        "build",
        `${project.projectId}_error.log`
      );
      fs.writeFileSync(logPath, error);
      project.isBuilding = true;
      project.isBuildSuccess = false;
      project.buildDate = new Date();
      project.status = "error";
      error_log=error_log+error+"\n";
      project.statusMessage = `Build Failed please check log file => ${project.projectId}_error.log`;
      event.reply("status", JSON.stringify(project));
    });
    cmdProcess.stderr.on('end',()=>{
      let logPath = path.join(
        __dirname,
        "..",
        "logs",
        "build",
        `${project.projectId}_success.log`
      );
      fs.writeFileSync(logPath, error_log);
    })
  };

  deployHandler = (__event, data) => {};

  buildSuccessLogHandler = (__event, data) => {
    const parsedData = JSON.parse(data);
    const project = new Project(parsedData);
    cmd.runSync(
      `notepad ${path.join(
        __dirname,
        "..",
        "logs",
        "build",
        project.projectId + "_success.log"
      )}`
    );
  };

  buildErrorLogHandler = (__event, data) => {
    const parsedData = JSON.parse(data);
    const project = new Project(parsedData);
    cmd.runSync(
      `notepad ${path.join(
        __dirname,
        "..",
        "logs",
        "build",
        project.projectId + "_error.log"
      )}`
    );
  };
}

module.exports = Operations;

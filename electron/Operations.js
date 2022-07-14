const Project = require("./Project");
const fs = require("fs");
const fsx = require("fs-extra");
const path = require("path");
const dbPath = path.join(__dirname, "..", "electronDB.dat");
const logsBuildPath = path.join(__dirname, "..", "logs", "build");
const logsDeployPath = path.join(__dirname, "..", "logs", "deploy");
const system = require("system-commands");


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

  addHandler = (event, data) => {
    const parsedData = JSON.parse(data);
    const project = new Project(parsedData);
    project.projectId = require("crypto").randomBytes(5).toString("hex");
    const rawData = fs.readFileSync(dbPath);
    const parsedDb = JSON.parse(rawData);
    const projects = parsedDb.map((item) => new Project(item));
    projects.push(project);
    const strProjects = JSON.stringify(projects);
    fs.writeFileSync(dbPath, strProjects);
    return strProjects;
  };

  removeHandler = (event, data) => {
    const parsedData = JSON.parse(data);
    const project = new Project(parsedData);
    const rawData = fs.readFileSync(dbPath);
    const parsedDb = JSON.parse(rawData);
    let projects = parsedDb.map((item) => new Project(item));
    projects = projects.filter((item) => item.projectId !== project.projectId);
    fs.writeFileSync(dbPath, JSON.stringify(projects));
    return JSON.stringify(projects);
  };

  updateHandler = (event, data) => {
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
    const projects = JSON.parse(fs.readFileSync(dbPath)).map(
      (item) => new Project(item)
    );
    let project = new Project(JSON.parse(data));
    let cmdString = `cd ${project.projectPath} && npm run ng build ${
      project.isProd ? "--prod" : ""
    } --configuration=${project.configuration} --base-href=${project.baseHref}`;
    project.isBuilding = true;
    project.status = "info";
    project.statusMessage = `Build in-progress please check log file => ${project.projectId}_build.log`;
    project.isBuildSuccess = false;
    fs.writeFileSync(dbPath, JSON.stringify(projects));
    event.sender.send("status", JSON.stringify(project));
    system(cmdString)
      .then((result) => {
        let data = result;
        let logPath = path.join(
          __dirname,
          "..",
          "logs",
          "build",
          `${project.projectId}_success.log`
        );
        fs.writeFileSync(logPath, data);
        project.isBuilding = false;
        project.status = "success";
        project.statusMessage = `Build completed please check log file => ${project.projectId}_success.log`;
        project.isBuildSuccess = true;
        project.buildDate = new Date();
        event.sender.send("status", JSON.stringify(project));
        const pId = projects.findIndex(
          (item) => item.projectId === project.projectId
        );
        projects[pId] = project;
        fs.writeFileSync(dbPath, JSON.stringify(projects));
      })
      .catch((error) => {
        let logPath = path.join(
          __dirname,
          "..",
          "logs",
          "build",
          `${project.projectId}_error.log`
        );
        fs.writeFileSync(logPath, error);
        project.isBuilding = false;
        project.status = "error";
        project.statusMessage = `Build failed please check log file => ${project.projectId}_error.log`;
        project.isBuildSuccess = false;
        event.sender.send("status", JSON.stringify(project));
        const pId = projects.findIndex(
          (item) => item.projectId === project.projectId
        );
        projects[pId] = project;
        fs.writeFileSync(dbPath, JSON.stringify(projects));
      });
  };

  deployHandler = (event, data) => {
    const projects = JSON.parse(fs.readFileSync(dbPath)).map(
      (item) => new Project(item)
    );
    const project = new Project(JSON.parse(data));
    const buildProjectFolder = path.join(
      project.projectPath,
      "dist",
      project.projectName.toLowerCase()
    );
    project.isDeploying = true;
    project.status = "info";
    project.statusMessage = `Deployment in-progress please check log file => ${project.projectId}_success.log`;
    project.isDeploySuccess = false;
    event.sender.send("status", JSON.stringify(project));
    if (fs.existsSync(buildProjectFolder)) {
      if (project.isWar) {
        if (
          fs.existsSync(path.join(project.projectPath, "dist", project.warName))
        ) {
          fsx.rmSync(path.join(project.projectPath, "dist", project.warName), {
            recursive: true,
          });
        }
        let warName = project.warName;
        if (warName.lastIndexOf(".") > 0) {
          warName = warName.substring(0, warName.lastIndexOf(".")) + ".war";
        } else {
          warName = project.projectName.toLowerCase() + ".war";
        }
        project.warName = warName;
        system(
          `cd ${path.join(project.projectPath, "dist")} && jar cvf ${
            project.warName
          } .`
        )
          .then((result) => {
            const src = path.join(project.projectPath, "dist", project.warName);
            const dist = path.join(project.deploymentPath, project.warName);
            if (fs.existsSync(dist)) {
              fs.unlinkSync(dist);
            }
            fsx.moveSync(src, dist, { recursive: true });
            let logPath = path.join(
              __dirname,
              "..",
              "logs",
              "deploy",
              `${project.projectId}_success.log`
            );
            result=result+` \n \n ${src} was deployed to ${dist} successfully on ${new Date().toLocaleString()}`;
            fs.writeFileSync(logPath, result);
            project.isDeploying = false;
            project.status = "success";
            project.statusMessage = `Deployment completed please check log file => ${project.projectId}_success.log`;
            project.isDeploySuccess = true;
            project.deploymentDate = new Date();
            event.sender.send("status", JSON.stringify(project));
            const pId = projects.findIndex(
              (item) => item.projectId === project.projectId
            );
            projects[pId] = project;
            fs.writeFileSync(dbPath, JSON.stringify(projects));
          })
          .catch((error) => {
            let logPath = path.join(
              __dirname,
              "..",
              "logs",
              "deploy",
              `${project.projectId}_error.log`
            );
            fs.writeFileSync(logPath, error);
            project.isDeploying = true;
            project.status = "error";
            project.statusMessage = `Deployment failed please check log file => ${project.projectId}_error.log`;
            project.isDeploySuccess = false;
            event.sender.send("status", JSON.stringify(project));
            const pId = projects.findIndex(
              (item) => item.projectId === project.projectId
            );
            projects[pId] = project;
            fs.writeFileSync(dbPath, JSON.stringify(projects));
          });
      } else {
        const src = path.join(
          project.projectPath,
          "dist",
          project.projectName.toLowerCase()
        );
        const dist = path.join(
          project.deploymentPath,
          project.projectName.toLowerCase()
        );
        if (fs.existsSync(dist)) {
          fs.rmSync(dist, { recursive: true, force: true });
        }
        fsx.moveSync(src, dist, { recursive: true });
        let logPath = path.join(
          __dirname,
          "..",
          "logs",
          "deploy",
          `${project.projectId}_success.log`
        );
        fs.writeFileSync(
          logPath,
          `${src} was deployed to ${dist} successfully on ${new Date().toLocaleString()} `
        );
        project.isDeploying = false;
        project.status = "success";
        project.statusMessage = `Deployment completed please check log file => ${project.projectId}_success.log`;
        project.isDeploySuccess = true;
        project.deploymentDate = new Date();
        event.sender.send("status", JSON.stringify(project));
        const pId = projects.findIndex(
          (item) => item.projectId === project.projectId
        );
        projects[pId] = project;
        fs.writeFileSync(dbPath, JSON.stringify(projects));
      }
    } else {
      project.isDeploying = false;
      project.status = "error";
      project.statusMessage = `It is required to build tthe project before deploying`;
      project.isDeploySuccess = false;
      event.sender.send("status", JSON.stringify(project));
      const pId = projects.findIndex(
        (item) => item.projectId === project.projectId
      );
      projects[pId] = project;
      fs.writeFileSync(dbPath, JSON.stringify(projects));
    }
  };

  buildSuccessLogHandler = (event, data) => {
    const parsedData = JSON.parse(data);
    const project = new Project(parsedData);
    system(
      `notepad ${path.join(
        __dirname,
        "..",
        "logs",
        "build",
        project.projectId + "_success.log"
      )}`
    )
    .then((__result) => {
      project.status = "info";
      project.statusMessage = `Log File ${project.projectId}_success.log opened in Notepad`;
      event.sender.send("status", JSON.stringify(project));
    })
    .catch((__error) => {
      project.status = "error";
      project.statusMessage = `Failed to open Log file ${project.projectId}_success.log`;
      event.sender.send("status", JSON.stringify(project));
    });
  };

  buildErrorLogHandler = (event, data) => {
    const parsedData = JSON.parse(data);
    const project = new Project(parsedData);
    system(
      `notepad ${path.join(
        __dirname,
        "..",
        "logs",
        "build",
        project.projectId + "_error.log"
      )}`
    )
    .then((__result) => {
      project.status = "info";
      project.statusMessage = `Log File ${project.projectId}_error.log opened in Notepad`;
      event.sender.send("status", JSON.stringify(project));
    })
    .catch((__error) => {
      project.status = "error";
      project.statusMessage = `Failed to open Log file ${project.projectId}_error.log`;
      event.sender.send("status", JSON.stringify(project));
    });
  };

  deploySuccessLogHandler = (event, data) => {
    const parsedData = JSON.parse(data);
    const project = new Project(parsedData);
    system(
      `notepad ${path.join(
        __dirname,
        "..",
        "logs",
        "deploy",
        project.projectId + "_success.log"
      )}`
    )
    .then((__result) => {
      project.status = "info";
      project.statusMessage = `Log File ${project.projectId}_success.log opened in Notepad`;
      event.sender.send("status", JSON.stringify(project));
    })
    .catch((__error) => {
      project.status = "error";
      project.statusMessage = `Failed to open Log file ${project.projectId}_success.log`;
      event.sender.send("status", JSON.stringify(project));
    });
  };

  deployErrorLogHandler = (event, data) => {
    const parsedData = JSON.parse(data);
    const project = new Project(parsedData);
    system(
      `notepad ${path.join(
        __dirname,
        "..",
        "logs",
        "deploy",
        project.projectId + "_error.log"
      )}`
    )
      .then((__result) => {
        project.status = "info";
        project.statusMessage = `Log File ${project.projectId}_error.log opened in Notepad`;
        event.sender.send("status", JSON.stringify(project));
      })
      .catch((__error) => {
        project.status = "error";
        project.statusMessage = `Failed to open Log file ${project.projectId}_error.log`;
        event.sender.send("status", JSON.stringify(project));
      });
  };
}

module.exports = Operations;

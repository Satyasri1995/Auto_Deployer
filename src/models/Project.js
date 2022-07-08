class Project {
  constructor(data) {
    this.projectId = data ? data.projectId : Math.random().toString();
    this.projectName = data ? data.projectName : "";
    this.projectPath = data ? data.projectPath : "";
    this.deploymentPath = data ? data.deploymentPath : "";
    this.configuration = data ? data.configuration : "development";
    this.baseHref = data ? data.baseHref : "./";
    this.warName = data ? data.warName : "project.war";
    this.isConfigurable = data ? data.isConfigurable : false;
    this.isWar = data ? data.isWar : false;
    this.deployBuild = data ? data.deployBuild : false;
    this.isProd = data ? data.isProd : false;
    this.isDeploying = data ? data.isDeploying : false;
    this.isDeployed = data ? data.isDeployed : false;
    this.isBuildSuccess = data ? data.isBuildSuccess : false;
    this.isBuildFailure = data ? data.isBuildFailure : false;
    this.status = data ? data.status : "error";
    this.isBuilding = data ? data.isBuilding : false;
    this.buildDate = data ? data.buildDate : null;
    this.deploymentDate = data ? data.deploymentDate : null;
    this.statusMessage = data ? data.statusMessage : "This is Testing";
  }
}
export default Project;

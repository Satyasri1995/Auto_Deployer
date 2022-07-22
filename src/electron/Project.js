class Project {
  constructor(data) {
    this.projectId = data ? data.projectId : "";
    this.projectName = data ? data.projectName : "";
    this.projectPath = data ? data.projectPath : "";
    this.deploymentPath = data ? data.deploymentPath : "";
    this.configuration = data ? data.configuration : "development";
    this.baseHref = data ? data.baseHref : "./";
    this.warName = data ? data.warName : "project.war";
    this.isWar = data ? data.isWar : false;
    this.isProd = data ? data.isProd : false;
    this.isDeploying = data ? data.isDeploying : false;
    this.isBuildSuccess = data ? data.isBuildSuccess : false;
    this.isDeploySuccess = data ? data.isDeploySuccess : false;
    this.status = data ? data.status : "info";
    this.isBuilding = data ? data.isBuilding : false;
    this.buildDate = data ? data.buildDate : null;
    this.deploymentDate = data ? data.deploymentDate : null;
    this.statusMessage = data ? data.statusMessage : "This is Testing";
    this.category=data?data.category:'All';
    this.buildLog=data?data.buildLog:false;
    this.deployLog=data?data.deployLog:false;
  }
}
module.exports=Project;

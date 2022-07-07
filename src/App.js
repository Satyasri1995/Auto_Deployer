import styled from "styled-components";
import { Accordion, AccordionTab } from "primereact/accordion";

import "primereact/resources/themes/mdc-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import ProjectForm from "./widgets/ProjectForm";
import { Fragment } from "react";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x:hidden;
`;

function App() {
  const projects = [
    {
      projectId:Math.random().toString(),
      projectName: "Project Name",
      projectPath: "/some/path",
      deploymentPath: "/some/path",
      configuration: "development",
      baseHref: "./",
      warName: "project",
      isConfigurable: true,
      isWar: true,
      deployBuild: true,
      isProd: true,
      isDeploying: true,
      isDeployed: true,
      isBuildSuccess: true,
      isBuildFailure: true,
      buildFailureMsg: "some message",
      isBuilding: true,
      buildDate: Date.now(),
      deploymentDate: Date.now(),
    },
    {
      projectId:Math.random().toString(),
      projectName: "Project Name",
      projectPath: "/some/path",
      deploymentPath: "/some/path",
      configuration: "development",
      baseHref: "./",
      warName: "project",
      isConfigurable: true,
      isWar: true,
      deployBuild: true,
      isProd: true,
      isDeploying: true,
      isDeployed: true,
      isBuildSuccess: true,
      isBuildFailure: true,
      buildFailureMsg: "some message",
      isBuilding: true,
      buildDate: Date.now(),
      deploymentDate: Date.now(),
    },
    {
      projectId:Math.random().toString(),
      projectName: "Project Name",
      projectPath: "/some/path",
      deploymentPath: "/some/path",
      configuration: "development",
      baseHref: "./",
      warName: "project",
      isConfigurable: true,
      isWar: true,
      deployBuild: true,
      isProd: true,
      isDeploying: true,
      isDeployed: true,
      isBuildSuccess: true,
      isBuildFailure: true,
      buildFailureMsg: "some message",
      isBuilding: true,
      buildDate: Date.now(),
      deploymentDate: Date.now(),
    },
    {
      projectId:Math.random().toString(),
      projectName: "Project Name",
      projectPath: "/some/path",
      deploymentPath: "/some/path",
      configuration: "development",
      baseHref: "./",
      warName: "project",
      isConfigurable: true,
      isWar: true,
      deployBuild: true,
      isProd: true,
      isDeploying: true,
      isDeployed: true,
      isBuildSuccess: true,
      isBuildFailure: true,
      buildFailureMsg: "some message",
      isBuilding: true,
      buildDate: Date.now(),
      deploymentDate: Date.now(),
    },
    {
      projectId:Math.random().toString(),
      projectName: "Project Name",
      projectPath: "/some/path",
      deploymentPath: "/some/path",
      configuration: "development",
      baseHref: "./",
      warName: "project",
      isConfigurable: true,
      isWar: true,
      deployBuild: true,
      isProd: true,
      isDeploying: true,
      isDeployed: true,
      isBuildSuccess: true,
      isBuildFailure: true,
      buildFailureMsg: "some message",
      isBuilding: true,
      buildDate: Date.now(),
      deploymentDate: Date.now(),
    },
    {
      projectId:Math.random().toString(),
      projectName: "Project Name",
      projectPath: "/some/path",
      deploymentPath: "/some/path",
      configuration: "development",
      baseHref: "./",
      warName: "project",
      isConfigurable: true,
      isWar: true,
      deployBuild: true,
      isProd: true,
      isDeploying: true,
      isDeployed: true,
      isBuildSuccess: true,
      isBuildFailure: true,
      buildFailureMsg: "some message",
      isBuilding: true,
      buildDate: Date.now(),
      deploymentDate: Date.now(),
    },
  ];

  return (
    <AppContainer className="flex align-items-stretch p-5">
      {projects.length > 0 ? (
        <div className="flex-1">
          <Accordion multiple>
            {projects.map((project) => (
              <AccordionTab header={<div className="flex flex-row align-items-center w-full font-semibold">
                <span className="flex-auto">{project.projectName}</span>
                <span className="text-xs pr-2 ">Last Build : {project.buildDate?new Date(project.buildDate).toDateString():'None'}</span>
                <span className="text-xs pr-2">Last Deployed : {project.deploymentDate?new Date(project.deploymentDate).toDateString():'None'}</span>
              </div>} key={project.projectId}>
                <ProjectForm project={project} />
              </AccordionTab>
            ))}
          </Accordion>
        </div>
      ) : (
        <div className="flex flex-1 justify-content-center align-items-center">
          <h3>You dont have any Projects to show</h3>
        </div>
      )}
    </AppContainer>
  );
}

export default App;

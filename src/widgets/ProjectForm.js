import { InputText } from "primereact/inputtext";
import styled from "styled-components";
import { ToggleButton } from "primereact/togglebutton";
import { ProgressBar } from "primereact/progressbar";
import { Fragment, useReducer } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

import {
  PopulateInitialProjectState,
  ProjectActions,
  ProjectReducer,
} from "../reducers/ProjectReducer";
import Project from "../models/Project";

const HelpMessage = styled.small`
  height: 0.75rem;
`;

const ProjectForm = (props) => {
  const initialState = PopulateInitialProjectState({ ...props.project });
  const [projectState, dispatchProject] = useReducer(
    ProjectReducer,
    initialState
  );

  const BeginProcess = (event) => {
    event.preventDefault();
    let data = new Project()
    let keys=Object.keys(data);
    keys.forEach((key)=>{
      data[key]=typeof projectState[key]==='object'&&projectState[key]?projectState[key].value:projectState[key];
    })
    console.log(data)
    dispatchProject({type:ProjectActions.isBuilding,payload:true})
  };

  return (
    <Fragment>
      {projectState.statusMessage ? (
        <Message
          severity={projectState.status}
          text={projectState.statusMessage}
          className="w-full justify-content-start mb-2"
          onClick={()=>{alert("Hi")}}
        />
      ) : null}
      <form className="flex flex-column" onSubmit={(e) => BeginProcess(e)}>
        <div className="flex flex-column">
          <div className="flex flex-row justify-content-between">
            <div className="field">
              <label htmlFor="name" className="block text-sm">
                Project Name
              </label>
              <InputText
                id="name"
                aria-describedby="name-help"
                name="projectName"
                className={
                  projectState.projectName.isValid
                    ? "block p-inputtext-sm"
                    : "block p-inputtext-sm p-invalid"
                }
                value={projectState.projectName.value}
                onChange={(e) => {
                  dispatchProject({
                    type: ProjectActions.projectName,
                    payload: e.target.value,
                  });
                }}
              />
              <HelpMessage
                id="name-help"
                className={
                  projectState.projectName.isValid
                    ? "block text-xs"
                    : "block text-xs p-error"
                }
              >
                {projectState.projectName.isValid ? "" : "Invalid Project Name"}
              </HelpMessage>
            </div>
            <div className="field ">
              <label htmlFor="projectPath" className="block text-sm">
                Project Path
              </label>
              <InputText
                id="projectPath"
                name="projectPath"
                aria-describedby="projectPath-help"
                className={
                  projectState.projectPath.isValid
                    ? "block p-inputtext-sm"
                    : "block p-inputtext-sm p-invalid"
                }
                value={projectState.projectPath.value}
                onChange={(e) => {
                  dispatchProject({
                    type: ProjectActions.projectPath,
                    payload: e.target.value,
                  });
                }}
              />
              <HelpMessage
                id="projectPath-help"
                className={
                  projectState.projectPath.isValid
                    ? "block text-xs"
                    : "block text-xs p-error"
                }
              >
                {projectState.projectPath.isValid ? "" : "Invalid Project Path"}
              </HelpMessage>
            </div>
            <div className="field ">
              <label htmlFor="deploymentPath" className="block text-sm">
                Deployment Path
              </label>
              <InputText
                id="deploymentPath"
                name="deploymentPath"
                aria-describedby="deploymentPath-help"
                className={
                  projectState.deploymentPath.isValid
                    ? "block p-inputtext-sm"
                    : "block p-inputtext-sm p-invalid"
                }
                value={projectState.deploymentPath.value}
                onChange={(e) => {
                  dispatchProject({
                    type: ProjectActions.deploymentPath,
                    payload: e.target.value,
                  });
                }}
              />
              <HelpMessage
                id="deploymentPath-help"
                className={
                  projectState.deploymentPath.isValid
                    ? "block text-xs"
                    : "block text-xs p-error"
                }
              >
                {projectState.deploymentPath.isValid
                  ? ""
                  : "Invalid Deployment Path"}
              </HelpMessage>
            </div>
          </div>
          <div className="flex flex-row justify-content-between">
            <div className="field ">
              <label htmlFor="baseHref" className="block text-sm">
                Base Href
              </label>
              <InputText
                id="baseHref"
                name="baseHref"
                aria-describedby="baseHref-help"
                className={
                  projectState.baseHref.isValid
                    ? "block p-inputtext-sm"
                    : "block p-inputtext-sm p-invalid"
                }
                value={projectState.baseHref.value}
                onChange={(e) => {
                  dispatchProject({
                    type: ProjectActions.baseHref,
                    payload: e.target.value,
                  });
                }}
              />
              <HelpMessage
                id="baseHref-help"
                className={
                  projectState.baseHref.isValid
                    ? "block text-xs"
                    : "block text-xs p-error"
                }
              >
                {projectState.baseHref.isValid ? "" : "Invalid Base Href"}
              </HelpMessage>
            </div>
            <div className="field ">
              <label htmlFor="warName" className="block text-sm">
                War Name
              </label>
              <InputText
                id="warName"
                name="warName"
                aria-describedby="warName-help"
                className={
                  projectState.warName.isValid
                    ? "block p-inputtext-sm"
                    : "block p-inputtext-sm p-invalid"
                }
                value={projectState.warName.value}
                onChange={(e) => {
                  dispatchProject({
                    type: ProjectActions.warName,
                    payload: e.target.value,
                  });
                }}
              />
              <HelpMessage
                id="warName-help"
                className={
                  projectState.warName.isValid
                    ? "block text-xs"
                    : "block text-xs p-error"
                }
              >
                {projectState.warName.isValid ? "" : "Invalid War Name"}
              </HelpMessage>
            </div>
            <div className="field ">
              <label htmlFor="configuration" className="block text-sm">
                Configuration
              </label>
              <InputText
                id="configuration"
                name="configuration"
                aria-describedby="configuration-help"
                className={
                  projectState.configuration.isValid
                    ? "block p-inputtext-sm"
                    : "block p-inputtext-sm p-invalid"
                }
                value={projectState.configuration.value}
                onChange={(e) => {
                  dispatchProject({
                    type: ProjectActions.configuration,
                    payload: e.target.value,
                  });
                }}
              />
              <HelpMessage
                id="configuration-help"
                className={
                  projectState.configuration.isValid
                    ? "block text-xs"
                    : "block text-xs p-error"
                }
              >
                {projectState.configuration.isValid ? "" : "Invalid War Name"}
              </HelpMessage>
            </div>
          </div>
          <div className="flex flex-row justify-content-between">
            <div className="field ">
              <label htmlFor="isWar" className="block text-sm">
                Is War ?
              </label>
              <ToggleButton
                id="isWar"
                name="isWar"
                aria-describedby="isWar-help"
                className={
                  projectState.isWar.isValid
                    ? "block p-inputtext-sm"
                    : "block p-inputtext-sm p-invalid"
                }
                checked={projectState.isWar.value}
                onChange={(e) => {
                  dispatchProject({
                    type: ProjectActions.isWar,
                    payload: e.target.value,
                  });
                }}
              />
            </div>
            <div className="field ">
              <label htmlFor="isProd" className="block text-sm">
                Is Production Mode ?
              </label>
              <ToggleButton
                id="isProd"
                name="isProd"
                aria-describedby="isProd-help"
                className={
                  projectState.isProd.isValid
                    ? "block p-inputtext-sm"
                    : "block p-inputtext-sm p-invalid"
                }
                checked={projectState.isProd.value}
                onChange={(e) => {
                  dispatchProject({
                    type: ProjectActions.isProd,
                    payload: e.target.value,
                  });
                }}
              />
            </div>
            <div className="field ">
              <label htmlFor="isConfigurable" className="block text-sm">
                Is Configurable ?
              </label>
              <ToggleButton
                id="isConfigurable"
                name="isConfigurable"
                aria-describedby="isConfigurable-help"
                className={
                  projectState.isConfigurable.isValid
                    ? "block p-inputtext-sm"
                    : "block p-inputtext-sm p-invalid"
                }
                checked={projectState.isConfigurable.value}
                onChange={(e) => {
                  dispatchProject({
                    type: ProjectActions.isConfigurable,
                    payload: e.target.value,
                  });
                }}
              />
            </div>
            <div className="field ">
              <label htmlFor="deployBuild" className="block text-sm">
                Deploy After Build ?
              </label>
              <ToggleButton
                id="deployBuild"
                name="deployBuild"
                aria-describedby="deployBuild-help"
                className={
                  projectState.deployBuild.isValid
                    ? "block p-inputtext-sm"
                    : "block p-inputtext-sm p-invalid"
                }
                checked={projectState.deployBuild.value}
                onChange={(e) => {
                  dispatchProject({
                    type: ProjectActions.deployBuild,
                    payload: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          {projectState.isBuilding || projectState.isDeploying ? (
            <div className="field ">
              <label htmlFor="status" className="block text-sm">
                {projectState.status}
              </label>
              <ProgressBar id="status" mode="indeterminate" />
            </div>
          ) : (
            <div className="flex flex-row justify-content-center w-full">
              <Button
                label="Begin"
                type="submit"
                disabled={!projectState.isFormValid}
                className="p-button-raised mx-4"
              />
            </div>
          )}
        </div>
      </form>
    </Fragment>
  );
};

export default ProjectForm;

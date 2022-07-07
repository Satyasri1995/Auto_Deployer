import { InputText } from "primereact/inputtext";
import styled from "styled-components";
import { ToggleButton } from "primereact/togglebutton";
import { ProgressBar } from "primereact/progressbar";
import { Fragment } from "react";
import { Button } from "primereact/button";

const HelpMessage = styled.small`
  height: 0.75rem;
`;

const ProjectForm = (props) => {
  return (
    <Fragment>
      <form className="flex flex-column">
        <div className="flex flex-column">
          <div className="flex flex-row justify-content-between">
            <div className="field ">
              <label htmlFor="name" className="block text-sm">
                Project Name
              </label>
              <InputText
                id="name"
                aria-describedby="name-help"
                className="block p-inputtext-sm  p-valid"
                value={props.project.projectName}
              />
              <HelpMessage id="name-help" className="block text-xs">
                Some Message
              </HelpMessage>
            </div>
            <div className="field ">
              <label htmlFor="projectPath" className="block text-sm">
                Project Path
              </label>
              <InputText
                id="projectPath"
                aria-describedby="projectPath-help"
                className="block p-inputtext-sm  p-valid"
                value={props.project.projectPath}
              />
              <HelpMessage id="projectPath-help" className="block text-xs">
                Some Message
              </HelpMessage>
            </div>
            <div className="field ">
              <label htmlFor="deploymentPath" className="block text-sm">
                Deployment Path
              </label>
              <InputText
                id="deploymentPath"
                aria-describedby="deploymentPath-help"
                className="block p-inputtext-sm  p-valid"
                value={props.project.deploymentPath}
              />
              <HelpMessage id="deploymentPath-help" className="block text-xs">
                Some Message
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
                aria-describedby="baseHref-help"
                className="block p-inputtext-sm  p-valid"
                value={props.project.baseHref}
              />
              <HelpMessage id="baseHref-help" className="block text-xs">
                Some Message
              </HelpMessage>
            </div>
            <div className="field ">
              <label htmlFor="warName" className="block text-sm">
                War Name
              </label>
              <InputText
                id="warName"
                aria-describedby="warName-help"
                className="block p-inputtext-sm  p-valid"
                value={props.project.warName}
              />
              <HelpMessage id="warName-help" className="block text-xs">
                Some Message
              </HelpMessage>
            </div>
            <div className="field ">
              <label htmlFor="configuration" className="block text-sm">
                Configuration
              </label>
              <InputText
                id="configuration"
                aria-describedby="configuration-help"
                className="block p-inputtext-sm  p-valid"
                value={props.project.configuration}
              />
              <HelpMessage id="configuration-help" className="block text-xs">
                Some Message
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
                aria-describedby="isWar-help"
                className="block p-inputtext-sm  p-valid"
                checked={props.project.isWar}
                onChange={() => {}}
              />
            </div>
            <div className="field ">
              <label htmlFor="isProd" className="block text-sm">
                Is Production Mode ?
              </label>
              <ToggleButton
                id="isProd"
                aria-describedby="isProd-help"
                className="block p-inputtext-sm  p-valid"
                checked={props.project.isProd}
                onChange={() => {}}
              />
            </div>
            <div className="field ">
              <label htmlFor="isConfigurable" className="block text-sm">
                Is Configurable ?
              </label>
              <ToggleButton
                id="isConfigurable"
                aria-describedby="isConfigurable-help"
                className="block p-inputtext-sm  p-valid"
                checked={props.project.isConfigurable}
                onChange={() => {}}
              />
            </div>
            <div className="field ">
              <label htmlFor="deployBuild" className="block text-sm">
                Deploy After Build ?
              </label>
              <ToggleButton
                id="deployBuild"
                aria-describedby="deployBuild-help"
                className="block p-inputtext-sm  p-valid"
                checked={props.project.deployBuild}
                onChange={() => {}}
              />
            </div>
          </div>
          {/* <div className="flex flex-row justify-content-center w-full">
          <Button label="Begin" className="p-button-raised p-button-text" />
        </div> */}
        </div>
        <div className="field ">
          <label htmlFor="status" className="block text-sm">
            Status
          </label>
          <ProgressBar id="status" mode="indeterminate" />
        </div>
      </form>
    </Fragment>
  );
};

export default ProjectForm;

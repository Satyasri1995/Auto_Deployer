import { Fragment } from "react";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ProjectStateActions } from "../store/slices/projects";

const ProjectsList = (props) => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.data.projects);

  const editProjectHandler = (data) => {
    dispatch(ProjectStateActions.edit(data));
    dispatch(ProjectStateActions.redirectTo("/edit"));
  };

  const dateFormat = (date) => {
    return date ? new Date(date).toLocaleString() : "None";
  };

  const confirm = (event, data) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => {
        dispatch(ProjectStateActions.delete(data));
      },
      reject: () => {},
    });
  };

  const tableAction = (data) => {
    return (
      <div className="flex flex-row justify-content-start">
        <ConfirmPopup />
        <Button
          id={`${data.projectId}_buildBtn`}
          onClick={() => {
            dispatch(ProjectStateActions.build(data));
          }}
          tooltipOptions={{
            position: "left",
            mouseTrack: true,
            mouseTrackTop: true,
          }}
          tooltip={!data.isBuilding ? "Build Project" : "Building Project"}
          icon={data.isBuilding ? "pi pi-spin pi-spinner" : "pi pi-play"}
          className="p-button-raised p-button-primary p-button-sm p-button-rounded mx-1"
        />
        {data.isBuildSuccess ? (
          <Fragment>
            <Button
              id={`${data.projectId}_deployBtn`}
              onClick={() => {
                dispatch(ProjectStateActions.deploy(data));
              }}
              tooltipOptions={{
                position: "left",
                mouseTrack: true,
                mouseTrackTop: true,
              }}
              tooltip={
                !data.isDeploying ? "Deploy Project" : "Deploying Project"
              }
              icon={data.isDeploying ? "pi pi-spin pi-spinner" : "pi pi-inbox"}
              className="p-button-raised p-button-help p-button-sm p-button-rounded mx-1"
            />
          </Fragment>
        ) : null}
        <Button
          icon="pi pi-pencil"
          onClick={(e) => editProjectHandler(data)}
          tooltipOptions={{
            position: "left",
            mouseTrack: true,
            mouseTrackTop: true,
          }}
          tooltip={"Edit Project"}
          className="p-button-raised p-button-warning p-button-sm p-button-rounded mx-1"
        />
        {data.buildLog ? (
          <Fragment>
            {data.isBuildSuccess ? (
              <Button
                icon="pi pi-file"
                tooltip={"Show Build log"}
                tooltipOptions={{
                  position: "left",
                  mouseTrack: true,
                  mouseTrackTop: true,
                }}
                onClick={(e) =>
                  dispatch(ProjectStateActions.build_success_log(data))
                }
                className="p-button-raised p-button-success p-button-sm p-button-rounded mx-1"
              />
            ) : (
              <Button
                icon="pi pi-file-excel"
                tooltip={"Show Build Error log"}
                tooltipOptions={{
                  position: "left",
                  mouseTrack: true,
                  mouseTrackTop: true,
                }}
                onClick={(e) =>
                  dispatch(ProjectStateActions.build_error_log(data))
                }
                className="p-button-raised p-button-secondary p-button-sm p-button-rounded mx-1"
              />
            )}
          </Fragment>
        ) : null}
        {data.deployLog ? (
          <Fragment>
            {data.isDeploySuccess ? (
              <Button
                icon="pi pi-file"
                tooltip={"Show Deploy log"}
                tooltipOptions={{
                  position: "left",
                  mouseTrack: true,
                  mouseTrackTop: true,
                }}
                onClick={(e) =>
                  dispatch(ProjectStateActions.deploy_success_log(data))
                }
                className="p-button-raised p-button-success p-button-sm p-button-rounded mx-1"
              />
            ) : (
              <Button
                icon="pi pi-file-excel"
                tooltip={"Show Deploy Error log"}
                tooltipOptions={{
                  position: "left",
                  mouseTrack: true,
                  mouseTrackTop: true,
                }}
                onClick={(e) =>
                  dispatch(ProjectStateActions.deploy_error_log(data))
                }
                className="p-button-raised p-button-secondary p-button-sm p-button-rounded mx-1"
              />
            )}
          </Fragment>
        ) : null}
        <Button
          icon="pi pi-trash"
          tooltip={"Delete Project"}
          onClick={(e) => confirm(e, data)}
          tooltipOptions={{
            position: "left",
            mouseTrack: true,
            mouseTrackTop: true,
          }}
          className="p-button-raised p-button-danger p-button-sm p-button-rounded mx-1"
        />
      </div>
    );
  };

  return (
    <Fragment>
      <main className="flex flex-column p-3" style={{ overflowX: "hidden" }}>
        <DataTable value={projects} responsiveLayout="scroll">
          <Column field="projectName" header="Project Name"></Column>
          <Column
            body={(rawData) => dateFormat(rawData.buildDate)}
            header="Last Build"
          ></Column>
          <Column
            body={(rawData) => dateFormat(rawData.deploymentDate)}
            header="Last Deployment"
          ></Column>
          <Column
            header="Category"
            body={(rawData) => rawData.category}
          ></Column>
          <Column
            body={(rawData) =>
              rawData.isBuilding || rawData.isDeploying ? (
                <div className="flex flex-row">
                  {rawData.isBuilding
                    ? "Building Project ... "
                    : "Deploying Project ... "}
                  <br />
                  <i className="pi pi-spin pi-spinner"></i>
                </div>
              ) : (
                tableAction(rawData)
              )
            }
            header="Action"
          ></Column>
        </DataTable>
      </main>
    </Fragment>
  );
};

export default ProjectsList;

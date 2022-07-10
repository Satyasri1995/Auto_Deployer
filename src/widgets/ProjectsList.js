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

  const projects = useSelector(state=>state.data.projects);

  const editProjectHandler = data => {
    dispatch(ProjectStateActions.edit(data));
    dispatch(ProjectStateActions.redirectTo("/edit"));
  }

  const dateFormat = date =>{
    return date?new Date(date).toDateString():'None';
  }

  const confirm = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => {},
      reject: () => {},
    });
  };

  const tableAction = data =>{
    return <div className="flex flex-row justify-content-around">
      <ConfirmPopup />
      <Button
          icon={data.isBuilding?'pi pi-spin pi-spinner':'pi pi-play'}
          className="p-button-raised p-button-primary p-button-sm p-button-rounded"
        />
      <Button
          icon={data.isDeploying?'pi pi-spin pi-spinner':'pi pi-inbox'}
          className="p-button-raised p-button-help p-button-sm p-button-rounded"
        />
      <Button
          icon="pi pi-pencil"
          onClick={(e)=>editProjectHandler(data)}
          className="p-button-raised p-button-warning p-button-sm p-button-rounded"
        />
      <Button
          icon="pi pi-trash"
          onClick={(e)=>confirm(e)}
          className="p-button-raised p-button-danger p-button-sm p-button-rounded"
        />
    </div>
  }

  return (
    <Fragment>
      <main className="flex flex-column p-3" style={{ overflowX: "hidden" }}>
        <DataTable value={projects}   responsiveLayout="scroll">
          <Column field="projectName" header="Project Name"></Column>
          <Column body={(rawData)=>dateFormat(rawData.buildDate)} header="Last Build"></Column>
          <Column body={(rawData)=>dateFormat(rawData.deploymentDate)} header="Last Deployment"></Column>
          <Column body={(rawData)=>tableAction(rawData)} header="Action"></Column>
        </DataTable>
      </main>
    </Fragment>
  );
};

export default ProjectsList;

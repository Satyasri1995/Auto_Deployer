import { Button } from "primereact/button";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { useHistory } from "react-router-dom";

const ProjectListItem = (props) => {

  const history = useHistory();

  const editProject = (event) => {
    history.push("/edit");
  };

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

  return (
    <section className="p-3 my-2 p-card flex flex-column align-items-end">
      <ConfirmPopup />
      <div className="flex flex-column w-full pb-3">
        <div className="py-1">
          <span className="font-semibold">Project Name</span> :{" "}
          <span>{props.project.projectName}</span>
        </div>
        <div className="py-1">
          <span className="font-semibold">Last Build Date</span> :{" "}
          <span>
            {props.project.buildDate
              ? new Date(props.project.buildDate).toDateString()
              : "None"}
          </span>
        </div>
        <div className="py-1">
          <span className="font-semibold">Last Deployment Date</span> :{" "}
          <span>
            {props.project.deploymentDate
              ? new Date(props.project.deploymentDate).toDateString()
              : "None"}
          </span>
        </div>
      </div>
      <div className="actions flex flex-row">
        <Button
          label="Build"
          className="p-button-raised p-button-primary p-button-sm mx-2"
        />
        <Button
          label="Deploy"
          className="p-button-raised p-button-help p-button-sm mx-2"
        />
        <Button
          label="Edit"
          onClick={(e) => editProject(e)}
          className="p-button-raised p-button-warning p-button-sm mx-2"
        />
        <Button
          label="Delete"
          onClick={(e) => confirm(e)}
          className="p-button-raised p-button-danger p-button-sm mx-2"
        />
      </div>
    </section>
  );
};

export default ProjectListItem;

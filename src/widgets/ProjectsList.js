import { Fragment } from "react";
import ProjectListItem from "./ProjectListItem";

const ProjectsList = (props) => {
  return (
    <Fragment>
      <main
        className="flex flex-column p-3"
        style={{ overflowX: "hidden" }}
      >
        {props.projects.map((project) => (
          <ProjectListItem key={project.projectId} project={project} />
        ))}
      </main>
    </Fragment>
  );
};

export default ProjectsList;

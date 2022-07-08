import styled from "styled-components";
import { Accordion, AccordionTab } from "primereact/accordion";
import "primereact/resources/themes/mdc-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import ProjectForm from "./widgets/ProjectForm";
import { Fragment, useState } from "react";
import { Button } from "primereact/button";
import Project from "./models/Project";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

function App() {

  const [projects, setProjectState] = useState([]);

  const createProject = () => {
    setProjectState([...projects,new Project()]);
  };

  const clearMessage=(index)=>{
    let newProjects = [...projects];
    newProjects[index].statusMessage=null;
    newProjects[index].status=null;
    setProjectState([...newProjects]);
  }

  return (
    <Fragment>
      <AppContainer className="flex align-items-stretch p-5">
        {projects.length > 0 ? (
          <div className="flex-1">
            <Accordion multiple activeIndex={[0]} onTabClose={(e)=>{clearMessage(e.index)}}>
              {projects.map((project) => (
                <AccordionTab 
                  header={
                    <div className="flex flex-row align-items-center w-full font-semibold">
                      <span className="flex-auto">{project.projectName}</span>
                      <span className="text-xs pr-2 ">
                        Last Build :{" "}
                        {project.buildDate
                          ? new Date(project.buildDate).toDateString()
                          : "None"}
                      </span>
                      <span className="text-xs pr-2">
                        Last Deployed :{" "}
                        {project.deploymentDate
                          ? new Date(project.deploymentDate).toDateString()
                          : "None"}
                      </span>
                    </div>
                  }
                  key={project.projectId}
                >
                  <ProjectForm project={project} />
                </AccordionTab>
              ))}
            </Accordion>
          </div>
        ) : (
          <div className="flex flex-1 justify-content-center align-items-center">
            <div className="flex flex-column">
              <h3>You dont have any Projects to show</h3>
              <Button
                onClick={() => createProject()}
                label="Create Project"
                className="p-button-raised "
              />
            </div>
          </div>
        )}
      </AppContainer>
    </Fragment>
  );
}

export default App;

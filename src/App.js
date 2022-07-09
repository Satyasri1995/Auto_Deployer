import styled from "styled-components";
import PrimeReact from 'primereact/api';
import "primereact/resources/themes/mdc-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import NavBar from "./widgets/NavBar";
import Project from "./models/Project";
import {  Route, Switch } from "react-router-dom";
import ProjectsList from "./widgets/ProjectsList";
import ProjectForm from "./widgets/ProjectForm";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

PrimeReact.ripple = true;

const projects = [];
const pro = new Project();
pro.projectName="Project Name";
projects.push(pro);
// projects.push(pro);

function App() {
  return (
    <AppContainer className="flex flex-column">
       <NavBar/>
       <Switch>
         <Route path="/" exact>
           <ProjectsList projects={projects} />
         </Route>
         <Route path="/edit">
           <ProjectForm project={pro} />
         </Route>
       </Switch>
     </AppContainer>
  );
}

export default App;


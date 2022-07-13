import styled from "styled-components";
import PrimeReact from "primereact/api";
import "primereact/resources/themes/mdc-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import NavBar from "./widgets/NavBar";
import { Route, Switch, useHistory } from "react-router-dom";
import ProjectsList from "./widgets/ProjectsList";
import ProjectForm from "./widgets/ProjectForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ProjectStateActions } from "./store/slices/projects";
import Project from "./models/Project";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

PrimeReact.ripple = true;

function App() {
  const redirect = useSelector((state) => state.data.redirectTo);
  const history = useHistory();
  const operations = useSelector((state) => state.data.operations);
  const projects = useSelector((state) => state.data.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    window.electron.status((__event, data) => {
      console.log(data);
      let project = new Project(JSON.parse(data));
      let newProjects = [...projects];
      let pId = newProjects.findIndex(
        (item) => item.projectId === project.projectId
      );
      if (pId >= 0) {
        newProjects[pId] = project;
      }
      dispatch(ProjectStateActions.loadProjects(newProjects));
    });
  }, [projects, dispatch]);

  useEffect(() => {
    async function doOperations() {
      switch (operations.type) {
        case "add":
          let addRes = await window.electron.add(
            JSON.stringify(new Project(operations.data))
          );
          addRes = JSON.parse(addRes);
          dispatch(ProjectStateActions.loadProjects(addRes));
          break;
        case "remove":
          let removeRes = await window.electron.remove(
            JSON.stringify(new Project(operations.data))
          );
          removeRes = JSON.parse(removeRes);
          dispatch(ProjectStateActions.loadProjects(removeRes));
          break;
        case "update":
          let updateRes = await window.electron.update(
            JSON.stringify(new Project(operations.data))
          );
          updateRes = JSON.parse(updateRes);
          dispatch(ProjectStateActions.loadProjects(updateRes));
          break;
        case "build":
          window.electron.build(JSON.stringify(operations.data));
          break;
        case "build_success_log":
          window.electron.build_success_log(JSON.stringify(operations.data));
          break;
        case "build_error_log":
          window.electron.build_error_log(JSON.stringify(operations.data));
          break;
        case "deploy":
          break;
        case "log":
          window.electron.log(JSON.stringify(operations.data));
          break;
        default:
          console.log("Operation Not Found");
      }
    }
    doOperations();
  }, [operations,dispatch]);

  useEffect(() => {
    async function fetchData() {
      let data = await window.electron.fetch();
      data = JSON.parse(data);
      dispatch(ProjectStateActions.loadProjects(data));
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (redirect) {
      history.push(redirect);
    }
  }, [redirect, history]);

  return (
    <AppContainer className="flex flex-column">
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <ProjectsList />
        </Route>
        <Route path="/edit" mode="edit">
          <ProjectForm />
        </Route>
        <Route path="/create" mode="create">
          <ProjectForm />
        </Route>
      </Switch>
    </AppContainer>
  );
}

export default App;

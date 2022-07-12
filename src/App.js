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
  const dispatch = useDispatch();

  useEffect(() => {
    async function doOperations(){
      switch (operations.type) {
        case "add":
          let addRes = await window.electron.add(JSON.stringify(operations.data));
          addRes=JSON.parse(addRes);
          dispatch(ProjectStateActions.loadProjects(addRes));
          break;
        case "remove":
          let removeRes = await window.electron.remove(JSON.stringify(operations.data));
          removeRes=JSON.parse(removeRes);
          dispatch(ProjectStateActions.loadProjects(removeRes));
          break;
        case "update":
          let updateRes = await window.electron.update(JSON.stringify(operations.data));
          updateRes=JSON.parse(updateRes);
          dispatch(ProjectStateActions.loadProjects(updateRes));
          break;
        default:
          console.log("Operation Not Found");
      }
    }
    doOperations();
  }, [operations]);

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

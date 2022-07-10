import styled from "styled-components";
import PrimeReact from 'primereact/api';
import "primereact/resources/themes/mdc-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import NavBar from "./widgets/NavBar";
import {  Route, Switch, useHistory } from "react-router-dom";
import ProjectsList from "./widgets/ProjectsList";
import ProjectForm from "./widgets/ProjectForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

PrimeReact.ripple = true;



function App() {

  const redirect = useSelector(state=>state.data.redirectTo);
  const history = useHistory();

  useEffect(()=>{
    if(redirect){
      history.push(redirect);
    }
  },[redirect,history])

  return (
    <AppContainer className="flex flex-column">
       <NavBar/>
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


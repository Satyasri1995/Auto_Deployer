import { createSlice } from "@reduxjs/toolkit";
import Project from "../../models/Project";

const initState = {
  projects: [],
  editProject: null,
  redirectTo: "/",
  currentPage: "/",
  newProject: new Project(),
  categories:[],
  category:'*',
  msgs:{
    severity:null,
    text:null
  },
  operations: {
    type: null,
    data: {},
  },
};

const ProjectSlice = createSlice({
  name: "projects",
  initialState: initState,
  reducers: {
    update(state, actions) {
      const pId = state.projects.findIndex(
        (p) => p.projectId === actions.payload.projectId
      );
      if (pId >= 0) {
        state.operations.type = "update";
      } else {
        state.operations.type = "add";
      }
      state.operations.data = actions.payload;
    },
    delete(state, actions) {
      state.operations={type:"remove",data:actions.payload}
    },
    build(state,actions){
      state.operations={type:"build",data:actions.payload}
    },
    build_success_log(state,actions){
      state.operations={type:"build_success_log",data:actions.payload}
    },
    build_error_log(state,actions){
      state.operations={type:"build_error_log",data:actions.payload}
    },
    deploy(state,actions){
      state.operations={type:"deploy",data:actions.payload}
    },
    deploy_success_log(state,actions){
      state.operations={type:"deploy_success_log",data:actions.payload}
    },
    deploy_error_log(state,actions){
      state.operations={type:"deploy_error_log",data:actions.payload}
    },
    clearEdit(state, __actions) {
      state.editProject = null;
    },
    redirectTo(state, actions) {
      state.redirectTo = actions.payload;
      state.currentPage = actions.payload;
    },
    edit(state, actions) {
      state.editProject = actions.payload;
    },
    loadProjects(state, actions) {
      state.projects = actions.payload;
    },
    loadCategories(state,actions){
      state.categories=actions.payload;
    },
    setCategory(state,actions){
      state.category=actions.payload;
    },
    filterByCategories(state,actions){
      state.operations={type:'filter',data:actions.payload}
    },
    message(state,actions){
      state.msgs=actions.payload;
    }
  },
});

export const ProjectStateActions = ProjectSlice.actions;
export default ProjectSlice.reducer;

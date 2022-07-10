import { createSlice } from "@reduxjs/toolkit";
import Project from "../../models/Project";


const pro = new Project();
pro.projectName="Project Name";
const pros=[];
pros.push(pro);

const initState = {
  projects: pros,
  editProject: null,
  redirectTo:"/",
  newProject:new Project()
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
        state.projects[pId] = actions.payload;
      } else {
        state.projects.push(actions.payload);
      }
    },
    delete(state, actions) {
      state.projects = state.projects.filter(
        (p) => p.projectId !== actions.payload.projectId
      );
    },
    edit(state, actions) {
      const pId = state.projects.findIndex(
        (p) => p.projectId === actions.payload.projectId
      );
      state.editProject = new Project(state.projects[pId]);
    },
    clearEdit(state, __actions) {
      state.editProject = null;
    },
    redirectTo(state,actions){
        state.redirectTo=actions.payload;
    }
  },
});

export const ProjectStateActions = ProjectSlice.actions;
export default ProjectSlice.reducer;

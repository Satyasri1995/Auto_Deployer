import { createSlice } from "@reduxjs/toolkit";
import Project from "../../models/Project";





const initState = {
  projects: [],
  editProject: null,
  redirectTo:"/",
  newProject:new Project(),
  operations:{
    type:null,
    data:{}
  }
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
        state.operations.type='update';
      } else {
        state.operations.type='add';
      }
      state.operations.data=actions.payload;
    },
    delete(state, actions) {
      state.operations.type='delete';
      state.operations.data=actions.payload;
    },
    clearEdit(state, __actions) {
      state.editProject = null;
    },
    redirectTo(state,actions){
        state.redirectTo=actions.payload;
    },
    loadProjects(state,actions){
      state.projects=actions.payload;
    }
  },
});

export const ProjectStateActions = ProjectSlice.actions;
export default ProjectSlice.reducer;

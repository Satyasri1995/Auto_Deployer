import { configureStore } from "@reduxjs/toolkit";

import ProjectReducer from "./slices/projects";

const store = configureStore({
  reducer: {
    data:ProjectReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
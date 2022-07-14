export const ProjectActions = {
  projectName: 1,
  projectPath: 2,
  deploymentPath: 3,
  configuration: 4,
  baseHref: 5,
  warName: 6,
  isConfigurable: 7,
  isWar: 8,
  deployBuild: 9,
  isProd: 10,
  isBuilding: 11,
  isDeploying: 12,
};

export const PopulateInitialProjectState = (project) => {
  return {
    projectName: {
      value: project.projectName,
      touched: false,
      isValid: project.projectName.length > 0,
    },
    projectPath: {
      value: project.projectPath,
      touched: false,
      isValid: project.projectPath.length > 0,
    },
    deploymentPath: {
      value: project.deploymentPath,
      touched: false,
      isValid: project.deploymentPath.length > 0,
    },
    configuration: {
      value: project.configuration,
      touched: false,
      isValid: project.configuration.length > 0,
    },
    baseHref: {
      value: project.baseHref,
      touched: false,
      isValid: project.baseHref.length > 0,
    },
    warName: {
      value: project.warName,
      touched: false,
      isValid: project.warName.length > 0,
    },
    isConfigurable: {
      value: project.isConfigurable,
      touched: false,
      isValid: true,
    },
    isWar: { value: project.isWar, touched: false, isValid: true },
    deployBuild: { value: project.deployBuild, touched: false, isValid: true },
    isProd: { value: project.isProd, touched: false, isValid: true },
    status: project.status,
    statusMessage: project.statusMessage,
    isDeploying: project.isBuilding,
    isDeployed: project.isDeployed,
    isBuildSuccess: project.isBuildSuccess,
    isBuildFailure: project.isBuildFailure,
    isBuilding: project.isBuilding,
    buildDate: project.buildDate,
    deploymentDate: project.deploymentDate,
    isFormValid: project.projectName.length > 0 &&
    project.projectPath.length > 0 &&
    project.deploymentPath.length > 0 &&
    project.configuration.length > 0 &&
    project.baseHref.length > 0 &&
    project.warName.length > 0,
    projectId: project.projectId,
  };
};

export const ProjectReducer = (state, actions) => {
  switch (actions.type) {
    case ProjectActions.projectName:
      return {
        ...state,
        projectName: {
          value: actions.payload,
          touched: true,
          isValid: actions.payload.length > 0,
        },
        isFormValid:
          actions.payload.length > 0 &&
          state.projectPath.value.length > 0 &&
          state.deploymentPath.value.length > 0 &&
          state.configuration.value.length > 0 &&
          state.baseHref.value.length > 0 &&
          state.warName.value.length > 0,
      };
    case ProjectActions.projectPath:
      return {
        ...state,
        projectPath: {
          value: actions.payload,
          touched: true,
          isValid: actions.payload.length > 0,
        },
        isFormValid:
          actions.payload.length > 0 &&
          state.projectName.value.length > 0 &&
          state.deploymentPath.value.length > 0 &&
          state.configuration.value.length > 0 &&
          state.baseHref.value.length > 0 &&
          state.warName.value.length > 0,
      };
    case ProjectActions.deploymentPath:
      return {
        ...state,
        deploymentPath: {
          value: actions.payload,
          touched: true,
          isValid: actions.payload.length > 0,
        },
        isFormValid:
          actions.payload.length > 0 &&
          state.projectName.value.length > 0 &&
          state.projectPath.value.length > 0 &&
          state.configuration.value.length > 0 &&
          state.baseHref.value.length > 0 &&
          state.warName.value.length > 0,
      };
    case ProjectActions.configuration:
      return {
        ...state,
        configuration: {
          value: actions.payload,
          touched: true,
          isValid: actions.payload.length > 0,
        },
        isFormValid:
          actions.payload.length > 0 &&
          state.projectName.value.length > 0 &&
          state.projectPath.value.length > 0 &&
          state.deploymentPath.value.length > 0 &&
          state.baseHref.value.length > 0 &&
          state.warName.value.length > 0,
      };
    case ProjectActions.baseHref:
      return {
        ...state,
        baseHref: {
          value: actions.payload,
          touched: true,
          isValid: actions.payload.length > 0,
        },
        isFormValid:
          actions.payload.length > 0 &&
          state.projectName.value.length > 0 &&
          state.projectPath.value.length > 0 &&
          state.deploymentPath.value.length > 0 &&
          state.configuration.value.length > 0 &&
          state.warName.value.length > 0,
      };
    case ProjectActions.warName:
      return {
        ...state,
        warName: {
          value: actions.payload,
          touched: true,
          isValid: actions.payload.length > 0,
        },
        isFormValid:
          (state.isWar.value ? actions.payload.length > 0 : true) &&
          state.projectName.value.length > 0 &&
          state.projectPath.value.length > 0 &&
          state.deploymentPath.value.length > 0 &&
          state.configuration.value.length > 0 &&
          state.baseHref.value.length > 0,
      };
    case ProjectActions.isConfigurable:
      return {
        ...state,
        isConfigurable: {
          value: actions.payload,
          touched: true,
          isValid: typeof actions.payload === "boolean",
        },
      };
    case ProjectActions.isWar:
      return {
        ...state,
        isWar: {
          value: actions.payload,
          touched: true,
          isValid: typeof actions.payload === "boolean",
        },
        isFormValid:
          (actions.payload ? state.warName.value.length > 0 : true) &&
          state.projectName.value.length > 0 &&
          state.projectPath.value.length > 0 &&
          state.deploymentPath.value.length > 0 &&
          state.configuration.value.length > 0 &&
          state.baseHref.value.length > 0,
        warName: {
          value: state.warName.value,
          touched: true,
          isValid: actions.payload ? state.warName.value.length > 0 : true,
        },
      };
    case ProjectActions.deployBuild:
      return {
        ...state,
        deployBuild: {
          value: actions.payload,
          touched: true,
          isValid: typeof actions.payload === "boolean",
        },
      };
    case ProjectActions.isProd:
      return {
        ...state,
        isProd: {
          value: actions.payload,
          touched: true,
          isValid: typeof actions.payload === "boolean",
        },
      };
    case ProjectActions.isBuilding:
      return {
        ...state,
        isBuilding: true,
        status: "Building Project ...",
      };
    case ProjectActions.isDeploying:
      return {
        ...state,
        isBuilding: false,
        isDeploying: true,
        status: "Deploying Project ...",
      };
    default:
      return {
        ...state,
      };
  }
};

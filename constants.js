const constants = {
  FILEPATHS: { PACKAGE_JSON: "./package.json" },
  DEFAULTS: {
    PACKAGE_VERSION: "1.0.0",
    STARTER_PROJECT_GIT_URL:
      "https://github.com/metrobuzz-com-ng/nodejs-starter-project.git",
    GIT_FOLDER: ".git",
  },
  ERRORS: {
    DEFAULT: (error) => `Error creating project: ${error || "Unknown error"}`,
    INVALID_PROJECT_NAME: () =>
      "Invalid project name. Project name must contain only letters, numbers, and underscores.",
    INVALID_DESTINATION_PATH: () =>
      "Invalid destination path. Please specify a valid existing directory.",
    PACKAGE_VERSION_RETRIEVAL: (error) =>
      `Error retrieving package version: ${error}`,
    UNABLE_TO_GENERATE: (errorMessage) =>
      `Unable to generate project: ${errorMessage}`,
    UNABLE_TO_INSTALL_DEPS: (errorMessage) =>
      `Unable to install dependencies: ${errorMessage}`,
    CREATE_PROJECT_ERROR: (errorMessage) =>
      `Error creating project: ${errorMessage}`,
  },
  LOGS: {
    CREATING_PROJECT: (projectName, destination) =>
      `Created new project "${projectName}" at ${destination}`,
    CREATION_SUCCESSFUL: (projectName) =>
      `Project "${projectName}" created successfully!`,
    GENERATING_PROJECT: (projectName) =>
      `Generating project '${projectName}'...`,
    INSTALLING_DEPENDENCIES: () => `Installing dependencies...`,
  },
  COMMAND_STREAMS: {
    CREATE_PROJECT: "Create a new project",
    SPECIFY_PROJECT_NAME: "Specify the project name",
    SPECIFY_DESTINATION: "Specify the destination directory",
    SHOW_VERBOSE_OUTPUT: "Show verbose output",
  },
  EXPECTED_ARGUMENTS: {
    PROJECT_NAME: "--project-name <name>",
    DESTINATION: "--destination <path>",
    VERBOSE: "-v, --verbose",
  },
  COMMANDS: {
    NEW: "new",
  },
  STDIO: {
    INHERIT: "inherit",
    IGNORE: "ignore",
  },
  AVAILABLE_STARTER_PROJECTS: {
    NODE_JS: {
      NO_DATABASE:
        "https://github.com/metrobuzz-com-ng/nodejs-starter-project.git",
      MONGO_DB: "",
      POSTGRE_SQL: "",
      MY_SQL: "",
    },
    REACT_NATIVE: {
      NO_STYLED_COMPONENTS: "",
      SHOPIFY_RESTYLE: "",
    },
    NEXT_JS: {
      NO_CSS_PROCESSOR: "",
      TAILWIND: "",
      BOOTSTRAP: "",
      MANTINE: "",
      MATERIAL_UI: "",
    },
    REACT_JS: {
      NO_CSS_PROCESSOR: "",
      TAILWIND: "",
      BOOTSTRAP: "",
      MANTINE: "",
      MATERIAL_UI: "",
    },
  },
};

module.exports = {
  constants,
};

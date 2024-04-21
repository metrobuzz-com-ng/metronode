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
    UNABLE_TO_CHECKOUT: (errorMessage) =>
      `Error finalizing project generation: ${errorMessage}`,
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
    SPECIFY_PLATFORM: "Specify platform",
    SPECIFY_DATABASE: "Specify database for node backend service",
    SPECIFY_ADAPTIVE_CSS: "Specify adaptive css type e.g tailwind",
    SPECIFY_ADAPTIVE_NATIVE_CSS:
      "Specify adaptive native css type e.g shopify-restyle",
  },
  EXPECTED_ARGUMENTS: {
    DESTINATION: "--destination <path>",
    PLATFORM: "--platform <node> <reactjs> <nextjs>",
    DATABASE: "--db <mysql> <postgresql> <mongodb>",
    ADAPTIVE_CSS:
      "--adaptiveCss <tailwind> <mantine> <material-ui> <bootstrap>",
    ADAPTIVE_NATIVE_CSS: "--adaptiveNativeCss <shopify-restyle>",
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
      BASE_URL:
        "https://github.com/metrobuzz-com-ng/nodejs-starter-project.git",
      BRANCHES: {
        POSTGRES: "postgres-sequelize",
        NO_DATABASE: "0.0.1",
        MONGO_DB: "mongodb-mongoose",
        MYSQL: "mysql-sequelize",
      },
    },
    REACT_NATIVE: {
      BASE_URL: "https://github.com/metrobuzz-com-ng/rn-starter-project.git",
      BRANCHES: {
        NO_STYLED_COMPONENTS: "0.0.1",
        SHOPIFY_RESTYLE: "shopify-restyle",
      },
    },
    NEXT_JS: {
      BASE_URL:
        "https://github.com/metrobuzz-com-ng/nextjs-starter-project.git",
      BRANCHES: {
        NO_CSS_PROCESSOR: "0.0.1",
        TAILWIND: "tailwind",
        BOOTSTRAP: "bootstrap",
        MANTINE: "mantine",
        MATERIAL_UI: "material-ui",
      },
    },
    REACT_JS: {
      BASE_URL:
        "https://github.com/metrobuzz-com-ng/reactjs-starter-project.git",
      BRANCHES: {
        NO_CSS_PROCESSOR: "0.0.1",
        TAILWIND: "tailwind",
        BOOTSTRAP: "bootstrap",
        MANTINE: "mantine",
        MATERIAL_UI: "material-ui",
      },
    },
  },
};

module.exports = {
  constants,
};

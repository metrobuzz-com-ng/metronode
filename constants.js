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
  },
  LOGS: {
    CREATING_PROJECT: (projectName, destination) =>
      `Creating new project "${projectName}" at ${destination}`,
    CREATION_SUCCESSFUL: (projectName) =>
      `Project "${projectName}" created successfully!`,
  },
  COMMAND_STREAMS: {
    CREATE_PROJECT: "Create a new project",
    SPECIFY_PROJECT_NAME: "Specify the project name",
    SPECIFY_DESTINATION: "Specify the destination directory",
  },
  EXPECTED_ARGUMENTS: {
    PROJECT_NAME: "--project-name <name>",
    DESTINATION: "--destination <path>",
  },
  COMMANDS: {},
};

module.exports = {
  constants,
};

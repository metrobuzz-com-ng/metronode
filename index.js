#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const { spawnSync } = require("child_process");
const { rmSync } = require("fs");
const { join } = require("path");
const { getPackageVersion } = require("./getPackageVersion");
const { isValidProjectName, isValidDestinationPath } = require("./validators");
const { constants } = require("./constants");

(async () => {
  try {
    const packageVersion = await getPackageVersion();
    program.version(packageVersion || constants.DEFAULTS.PACKAGE_VERSION);
  } catch (error) {
    program.version("null");
  }

  program
    .command("new")
    .description(constants.COMMAND_STREAMS.CREATE_PROJECT)
    .requiredOption(
      constants.EXPECTED_ARGUMENTS.PROJECT_NAME,
      constants.COMMAND_STREAMS.SPECIFY_PROJECT_NAME
    )
    .requiredOption(
      constants.EXPECTED_ARGUMENTS.DESTINATION,
      constants.COMMAND_STREAMS.SPECIFY_DESTINATION
    )
    .action(({ projectName, destination }) => {
      if (!isValidProjectName(projectName)) {
        console.error(chalk.red(constants.ERRORS.INVALID_PROJECT_NAME()));
        return;
      }

      if (!isValidDestinationPath(destination)) {
        console.error(chalk.red(constants.ERRORS.INVALID_DESTINATION_PATH()));
        return;
      }

      console.log(
        chalk.green(constants.LOGS.CREATING_PROJECT(projectName, destination))
      );

      const result = spawnSync(
        "git",
        ["clone", constants.DEFAULTS.STARTER_PROJECT_GIT_URL, projectName],
        {
          cwd: destination,
          stdio: "inherit",
        }
      );

      if (result.status === 0) {
        console.log(
          chalk.green(constants.LOGS.CREATION_SUCCESSFUL(projectName))
        );

        //This will help to remove the git directory of the starter project to enable users to create their own
        const projectPath = join(destination, projectName);

        rmSync(join(projectPath, constants.DEFAULTS.GIT_FOLDER), {
          recursive: true,
        });
      } else {
        console.error(chalk.red(constants.ERRORS.DEFAULT(result.error)));
      }
    });

  // Initiate command line arguments parsing
  program.parse(process.argv);
})();

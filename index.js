#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const { spawnSync } = require("child_process");
const { rmSync } = require("fs");
const { join } = require("path");
const { isValidProjectName, isValidDestinationPath } = require("./validators");
const { constants } = require("./constants");
const {
  confirmFolderIsUnique,
  updatePackageJson,
  getPackageVersion,
} = require("./utils");

(async () => {
  try {
    const packageVersion = await getPackageVersion();
    program.version(packageVersion || constants.DEFAULTS.PACKAGE_VERSION);
  } catch (error) {
    console.error(chalk.red(constants.ERRORS.PACKAGE_VERSION_RETRIEVAL(error)));
    process.exit(1);
  }

  program
    .command(`${constants.COMMANDS.NEW} [projectName]`)
    .description(constants.COMMAND_STREAMS.CREATE_PROJECT)
    .option(
      constants.EXPECTED_ARGUMENTS.DESTINATION,
      constants.COMMAND_STREAMS.SPECIFY_DESTINATION,
      "./"
    )
    .option(
      constants.EXPECTED_ARGUMENTS.VERBOSE,
      constants.COMMAND_STREAMS.SHOW_VERBOSE_OUTPUT
    )
    .action(async (projectName, { destination, verbose }) => {
      if (!projectName || !isValidProjectName(projectName)) {
        console.error(chalk.red(constants.ERRORS.INVALID_PROJECT_NAME()));
        program.help();
      }

      if (!isValidDestinationPath(destination)) {
        console.error(chalk.red(constants.ERRORS.INVALID_DESTINATION_PATH()));
        program.help();
      }

      const projectPath = join(destination, projectName);

      const { status } = await confirmFolderIsUnique(projectPath);

      if (!status) {
        process.exit();
      }

      console.log(chalk.blue(constants.LOGS.GENERATING_PROJECT(projectName)));

      try {
        const result = spawnSync(
          "git",
          ["clone", constants.DEFAULTS.STARTER_PROJECT_GIT_URL, projectName],
          {
            cwd: destination,
            stdio: verbose ? constants.STDIO.INHERIT : constants.STDIO.IGNORE,
          }
        );

        if (result.status !== 0) {
          throw new Error(constants.ERRORS.UNABLE_TO_GENERATE(result.error));
        }

        await updatePackageJson(join(projectPath, "package.json"), {
          name: projectName,
          description: projectName,
        });

        rmSync(join(projectPath, constants.DEFAULTS.GIT_FOLDER), {
          recursive: true,
        });

        console.log(chalk.green(constants.LOGS.INSTALLING_DEPENDENCIES()));

        const installDependencies = spawnSync("npm", ["install"], {
          cwd: projectPath,
          stdio: constants.STDIO.INHERIT,
        });

        if (installDependencies.status !== 0) {
          throw new Error(
            constants.ERRORS.UNABLE_TO_INSTALL_DEPS(installDependencies.error)
          );
        }

        console.log(
          chalk.green(constants.LOGS.CREATING_PROJECT(projectName, destination))
        );
      } catch (error) {
        console.error(
          chalk.red(constants.ERRORS.CREATE_PROJECT_ERROR(error.message))
        );
        process.exit(1);
      }
    });

  program.on("command:*", () => {
    console.error(chalk.red(`Invalid command: ${program.args.join(" ")}`));
    console.log(chalk.yellow("Available commands:"));
    console.log(chalk.yellow("- new       Create a new project"));
    program.help();
  });

  // Initiate command line arguments parsing
  program.parse(process.argv);
})();

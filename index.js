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
  getGitDetails,
} = require("./utils");

const asciiArt = `
                __                                  .___      
  _____   _____/  |________  ____   ____   ____   __| _/____  
 /     \_/ __ \   __\_  __ \/  _ \ /    \ /  _ \ / __ |/ __ \ 
|  Y Y  \  ___/|  |  |  | \(  <_> )   |  (  <_> ) /_/ \  ___/ 
|__|_|  /\___  >__|  |__|   \____/|___|  /\____/\____ |\___  >
      \/     \/                        \/            \/    \/ 
`;

(async () => {
  try {
    const packageVersion = await getPackageVersion();
    program.version(packageVersion || constants.DEFAULTS.PACKAGE_VERSION);
  } catch (error) {
    console.error(chalk.red(constants.ERRORS.PACKAGE_VERSION_RETRIEVAL(error)));
    process.exit(1);
  }
  console.log(chalk.blue(asciiArt));

  program
    .command(`${constants.COMMANDS.NEW} [projectName]`)
    .description(constants.COMMAND_STREAMS.CREATE_PROJECT)
    .option(
      constants.EXPECTED_ARGUMENTS.DATABASE,
      constants.COMMAND_STREAMS.SPECIFY_DATABASE
    )
    .option(
      constants.EXPECTED_ARGUMENTS.VERBOSE,
      constants.COMMAND_STREAMS.SHOW_VERBOSE_OUTPUT
    )
    .option(
      constants.EXPECTED_ARGUMENTS.DESTINATION,
      constants.COMMAND_STREAMS.SPECIFY_DESTINATION,
      "./"
    )
    .option(
      constants.EXPECTED_ARGUMENTS.PLATFORM,
      constants.COMMAND_STREAMS.SPECIFY_PLATFORM,
      "node"
    )
    .option(
      constants.EXPECTED_ARGUMENTS.ADAPTIVE_CSS,
      constants.COMMAND_STREAMS.SPECIFY_ADAPTIVE_CSS,
      "none"
    )
    .option(
      constants.EXPECTED_ARGUMENTS.ADAPTIVE_NATIVE_CSS,
      constants.COMMAND_STREAMS.SPECIFY_ADAPTIVE_NATIVE_CSS,
      "none"
    )
    .action(async (projectName, args) => {
      const {
        destination,
        verbose,
        platform,
        database,
        adaptiveCss,
        adaptiveNativeCss,
      } = args;
      console.log({ args });
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
        const { baseBranch, baseUrl } = getGitDetails(
          platform,
          database,
          adaptiveCss,
          adaptiveNativeCss,
          program
        );

        const result = spawnSync("git", ["clone", baseUrl, projectName], {
          cwd: destination,
          stdio: verbose ? constants.STDIO.INHERIT : constants.STDIO.IGNORE,
        });

        if (result.status !== 0) {
          throw new Error(constants.ERRORS.UNABLE_TO_GENERATE(result.error));
        }

        console.log({ baseBranch, destination, database });

        const branchCheckout = spawnSync("git", ["checkout", `${baseBranch}`], {
          cwd: projectPath,
          stdio: verbose ? constants.STDIO.INHERIT : constants.STDIO.IGNORE,
        });

        if (branchCheckout.status !== 0) {
          throw new Error(
            constants.ERRORS.UNABLE_TO_CHECKOUT(branchCheckout.error)
          );
        }

        await updatePackageJson(join(projectPath, "package.json"), {
          name: projectName,
          description: projectName,
        });

        rmSync(join(projectPath, constants.DEFAULTS.GIT_FOLDER), {
          recursive: true,
        });

        console.log(chalk.green(constants.LOGS.INSTALLING_DEPENDENCIES()));

        // const installDependencies = spawnSync("npm", ["install"], {
        //   cwd: projectPath,
        //   stdio: constants.STDIO.INHERIT,
        // });

        // if (installDependencies.status !== 0) {
        //   throw new Error(
        //     constants.ERRORS.UNABLE_TO_INSTALL_DEPS(installDependencies.error)
        //   );
        // }

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

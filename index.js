#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const { spawnSync } = require("child_process");
const { rmSync } = require("fs");
const { join } = require("path");
const { getPackageVersion } = require("./getPackageVersion");

(async () => {
  try {
    const packageVersion = await getPackageVersion();

    // Define the version of your CLI tool
    program.version(packageVersion || "1.0.0");
  } catch (error) {
    console.log(
      chalk.redBright(`Creating new project "${projectName}" at ${destination}`)
    );
    program.version("null");
  }

  program
    .command("new")
    .description("Create a new project")
    .requiredOption("--project-name <name>", "Specify the project name")
    .requiredOption("--destination <path>", "Specify the destination directory")
    .action(({ projectName, destination }) => {
      console.log(
        chalk.green(`Creating new project "${projectName}" at ${destination}`)
      );

      const result = spawnSync(
        "git",
        [
          "clone",
          "https://github.com/metrobuzz-com-ng/nodejs-starter-project.git",
          projectName,
        ],
        {
          cwd: destination,
          stdio: "inherit",
        }
      );

      if (result.status === 0) {
        console.log(
          chalk.green(`Project "${projectName}" created successfully!`)
        );

        //This will help to remove the git directory of the starter project to enable users to create their own
        const projectPath = join(destination, projectName);

        rmSync(join(projectPath, ".git"), { recursive: true });
      } else {
        console.error(
          chalk.red(
            `Error creating project: ${result.error || "Unknown error"}`
          )
        );
      }
    });

  // Display help information if no valid command is provided
  program.on("command:*", () => {
    console.error(chalk.red(`Invalid command: ${program.args.join(" ")}`));
    console.log(chalk.yellow("Available commands:"));
    console.log(chalk.yellow("- new       Create a new project"));
    program.help();
  });

  // Parse the command-line arguments
  program.parse(process.argv);
})();

#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const { spawnSync } = require("child_process");
const { rmdirSync } = require("fs");
const { join } = require("path");

// Define the version of your CLI tool
program.version("1.0.0");

// Define the "new" command
program
  .command("new")
  .description("Create a new project")
  .requiredOption("--projectname <name>", "Specify the project name")
  .option("--destination <path>", "Specify the destination directory", "./")
  .action(({ projectname, destination }) => {
    console.log(
      chalk.green(`Creating new project "${projectname}" at ${destination}`)
    );

    // Use child_process.spawnSync to run external commands
    const result = spawnSync(
      "git",
      [
        "clone",
        "https://github.com/yourusername/your-template-repo.git",
        projectname,
      ],
      {
        cwd: destination,
        stdio: "inherit",
      }
    );

    if (result.status === 0) {
      console.log(
        chalk.green(`Project "${projectname}" created successfully!`)
      );

      // Remove the .git directory after cloning
      const projectPath = join(destination, projectname);
      try {
        rmdirSync(join(projectPath, ".git"), { recursive: true });
        console.log(chalk.green(`Removed .git directory from ${projectname}`));
      } catch (error) {
        console.error(
          chalk.red(`Error removing .git directory: ${error.message}`)
        );
      }
    } else {
      console.error(
        chalk.red(`Error creating project: ${result.error || "Unknown error"}`)
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

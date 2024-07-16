const { spawnSync } = require("child_process");
const { constants } = require("./constants");

const intializeRNProject = ({ process, verbose, destination, projectName }) => {
  try {
    const result = spawnSync("npx", ["react-native", "init", projectName], {
      cwd: destination,
      stdio: verbose ? constants.STDIO.INHERIT : constants.STDIO.IGNORE,
    });

    if (result.status !== 0) {
      throw new Error(constants.ERRORS.UNABLE_TO_GENERATE(result.error));
    }
  } catch (error) {
  } finally {
    process.exit();
  }
};

module.exports = {
  intializeRNProject,
};

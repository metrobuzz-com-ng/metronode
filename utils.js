const { constants } = require("./constants");
const chalk = require("chalk");
const fs = require("fs").promises;

const confirmFolderIsUnique = async (folderPath) => {
  let message = "";
  let status = false;

  try {
    const fileData = await fs.stat(folderPath);

    if (fileData.isDirectory()) {
      throw new Error(`Folder '${folderPath}' already exists.`);
    }

    if (fileData.isFile()) {
      throw new Error(`File '${folderPath}' exists but is not a directory.`);
    }

    status = true;
    message = `Folder '${folderPath}' is unique and does not exist.`;
    console.log(chalk.blue(message));
  } catch (error) {
    if (error.code === "ENOENT") {
      status = true;
      message = `Folder '${folderPath}' does not exist.`;
      console.log(chalk.blue(message));
    } else {
      message = `Error checking folder '${folderPath}': ${error.message}`;
      console.error(chalk.red(message));
    }
  }

  return {
    status,
    message,
  };
};

const packageJsonPath = constants.FILEPATHS.PACKAGE_JSON;

const getPackageVersion = async () => {
  let packageVersion = "1";

  try {
    const data = await fs.readFile(packageJsonPath, "utf8");

    const packageJson = JSON.parse(data);

    packageVersion = packageJson.version;
  } catch (error) {
    throw new Error(error);
  } finally {
    return packageVersion;
  }
};

const updatePackageJson = async (path, updatedFields) => {
  try {
    const packageJsonData = await fs.readFile(path, "utf8");

    const packageJson = JSON.parse(packageJsonData);

    Object.assign(packageJson, updatedFields);

    await fs.writeFile(path, JSON.stringify(packageJson, null, 2));
  } catch (error) {
    throw new Error(`Error updating package.json. Here's why -- ${error}`);
  }
};

module.exports = {
  confirmFolderIsUnique,
  getPackageVersion,
  updatePackageJson,
};

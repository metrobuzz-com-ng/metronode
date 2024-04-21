const { platform } = require("os");
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

const validateDatabaseType = (databaseType) => {
  const validDatabases = ["postgresql", "mysql", "mongodb", "none"];

  return validDatabases.includes(databaseType);
};

const validatePlatforms = (platform) => {
  const validPlatforms = ["node", "reactjs", "nextjs", "react-native", "none"];

  return validPlatforms.includes(platform);
};

const validateWebCssProcessor = (processor) => {
  const validProcessor = [
    "tailwind",
    "bootstrap",
    "mantine",
    "material-ui",
    "none",
  ];

  return validProcessor.includes(processor);
};

const validateNativeCssProcessor = (processor) => {
  const validProcessor = ["shopify-restyle", "none"];

  return validProcessor.includes(processor);
};

const gitUrls = {
  node: constants.AVAILABLE_STARTER_PROJECTS.NODE_JS.BASE_URL,
  reactjs: constants.AVAILABLE_STARTER_PROJECTS.REACT_JS.BASE_URL,
  nextjs: constants.AVAILABLE_STARTER_PROJECTS.NEXT_JS.BASE_URL,
  "react-native": constants.AVAILABLE_STARTER_PROJECTS.REACT_NATIVE.BASE_URL,
};

const nodeDatabaseBranches = {
  none: constants.AVAILABLE_STARTER_PROJECTS.NODE_JS.BRANCHES.NO_DATABASE,
  postgresql: constants.AVAILABLE_STARTER_PROJECTS.NODE_JS.BRANCHES.POSTGRES,
  mysql: constants.AVAILABLE_STARTER_PROJECTS.NODE_JS.BRANCHES.MYSQL,
  mongodb: constants.AVAILABLE_STARTER_PROJECTS.NODE_JS.BRANCHES.MONGO_DB,
};

const reactBranches = {
  none: constants.AVAILABLE_STARTER_PROJECTS.REACT_JS.BRANCHES.NO_CSS_PROCESSOR,
  tailwind: constants.AVAILABLE_STARTER_PROJECTS.REACT_JS.BRANCHES.TAILWIND,
  bootstrap: constants.AVAILABLE_STARTER_PROJECTS.REACT_JS.BRANCHES.BOOTSTRAP,
  mantine: constants.AVAILABLE_STARTER_PROJECTS.REACT_JS.BRANCHES.MANTINE,
  "material-ui":
    constants.AVAILABLE_STARTER_PROJECTS.REACT_JS.BRANCHES.MATERIAL_UI,
};

const nextBranches = {
  none: constants.AVAILABLE_STARTER_PROJECTS.NEXT_JS.BRANCHES.NO_CSS_PROCESSOR,
  tailwind: constants.AVAILABLE_STARTER_PROJECTS.NEXT_JS.BRANCHES.TAILWIND,
  bootstrap: constants.AVAILABLE_STARTER_PROJECTS.NEXT_JS.BRANCHES.BOOTSTRAP,
  mantine: constants.AVAILABLE_STARTER_PROJECTS.NEXT_JS.BRANCHES.MANTINE,
  "material-ui":
    constants.AVAILABLE_STARTER_PROJECTS.NEXT_JS.BRANCHES.MATERIAL_UI,
};

const reactNativeBranches = {
  none: constants.AVAILABLE_STARTER_PROJECTS.REACT_NATIVE.BRANCHES
    .NO_STYLED_COMPONENTS,
  "shopify-restyle":
    constants.AVAILABLE_STARTER_PROJECTS.REACT_NATIVE.BRANCHES.SHOPIFY_RESTYLE,
};

const getGitDetails = (
  platform = "node",
  databaseType = "none",
  cssProcessor = "none",
  nativeCssProcessor = "none",
  program
) => {
  let baseBranch = "";
  let basePlatform = "node";

  if (!platform) {
    console.log(chalk.red("Platform is required and must be a valid string"));
    return program.exit(1);
  }

  if (!validatePlatforms(platform)) {
    console.log(
      chalk.red(
        "Invalid platform type provided. Allowed types - node, reactjs, nextjs. \nExiting..."
      )
    );
    return program.exit(1);
  }

  basePlatform = platform;

  if (basePlatform === "node") {
    if (!validateDatabaseType(databaseType)) {
      console.log(
        chalk.red(
          "Invalid database type provided. Allowed types - postgresql, mysql, mongodb.\nExiting..."
        )
      );
      return program.exit(1);
    }

    baseBranch = nodeDatabaseBranches[databaseType];
  }

  if (basePlatform === "reactjs") {
    if (!validateWebCssProcessor(cssProcessor)) {
      console.log(
        chalk.red(
          "Invalid web processor type provided. Allowed types - tailwind, bootstrap, mantine and mantine-ui.\nExiting..."
        )
      );
      return program.exit(1);
    }

    baseBranch = reactBranches[cssProcessor];
  }

  if (basePlatform === "nextjs") {
    if (!validateWebCssProcessor(cssProcessor)) {
      console.log(
        chalk.red(
          "Invalid web processor type provided. Allowed types - tailwind, bootstrap, mantine and mantine-ui.\nExiting..."
        )
      );
      return program.exit(1);
    }

    baseBranch = nextBranches[cssProcessor];
  }

  if (basePlatform === "react-native") {
    if (!validateNativeCssProcessor(nativeCssProcessor)) {
      console.log(
        chalk.red(
          "Invalid native processor type provided. Allowed types - shopify-restyle.\nExiting..."
        )
      );
      return program.exit(1);
    }

    baseBranch = reactNativeBranches[nativeCssProcessor];
  }

  baseUrl = gitUrls[basePlatform];

  return {
    baseBranch,
    baseUrl,
  };
};

module.exports = {
  confirmFolderIsUnique,
  getPackageVersion,
  updatePackageJson,
  getGitDetails,
};

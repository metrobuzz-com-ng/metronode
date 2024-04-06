const fs = require("fs").promises;

// Define the path to your package.json file
const packageJsonPath = "./package.json";

const getPackageVersion = async () => {
  let packageVersion = "1";

  try {
    const data = await fs.readFile(packageJsonPath, "utf8");

    // Parse package.json data as JSON
    const packageJson = JSON.parse(data);

    packageVersion = packageJson.version;
  } catch (error) {
  } finally {
    return packageVersion;
  }
};

module.exports = {
  getPackageVersion,
};

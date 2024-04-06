const fs = require("fs").promises;

const packageJsonPath = "./package.json";

const getPackageVersion = async () => {
  let packageVersion = "1";

  try {
    const data = await fs.readFile(packageJsonPath, "utf8");

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

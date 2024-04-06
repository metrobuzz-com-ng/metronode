const fs = require("fs");

// Define the path to your package.json file
const packageJsonPath = "./package.json";

const getPackageVersion = () => {
  let packageVersion = "1";

  fs.readFile(packageJsonPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading package.json:", err);
      return;
    }

    try {
      // Parse package.json data as JSON
      const packageJson = JSON.parse(data);

      // Get the version from package.json
      packageVersion = packageJson.version;
    } catch (error) {}
  });

  return packageVersion;
};

module.exports = {
  getPackageVersion,
};

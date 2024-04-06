const fs = require("fs");

const isValidProjectName = (name) => {
  const regex = /^[a-zA-Z0-9_]+$/;
  return name !== "" && regex.test(name);
};

const isValidDestinationPath = (path) => {
  return path !== "" && fs.existsSync(path) && fs.statSync(path).isDirectory();
};

module.exports = {
  isValidProjectName,
  isValidDestinationPath,
};

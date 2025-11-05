const fs = require("fs");

const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Temp file removed:", filePath);
    }
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.warn("Failed to delete temp file:", filePath, err.message);
    }
  }
};

module.exports = { deleteFile };

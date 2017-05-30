const path = require("path"),
      fs = require("fs");

const assetPathsFile = path.join("assets", "paths.json");
const defaultAssetPaths = {
    "js": "/assets/bundle.js",
    "css": "/assets/style.css"
};

module.exports = buildPath => {
    try {
        return JSON.parse(fs.readFileSync(path.join(buildPath, assetPathsFile)))["main"];
    } catch (e) {
        return defaultAssetPaths;
    }
};

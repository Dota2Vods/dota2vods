import path from "path";
import { writeFileSync } from "fs";

console.log("Building HTML...");

const buildPath = path.resolve(__dirname, "..", "build");
const pathToAsset = (htmlFile, assetFile) => path.join(path.relative(path.dirname(htmlFile), buildPath), assetFile);

//Just generate an index.html file for now
const filePath = path.resolve(buildPath, "index.html");
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Dota2Vods</title>
    <meta charset="utf-8">

    <link rel="stylesheet" href="${pathToAsset(filePath, "style.css")}">
</head>
<body>
    <div id="root"></div>

    <script src="${pathToAsset(filePath, "bundle.js")}"></script>
</body>
</html>`;
writeFileSync(filePath, html);

console.log("Done!");

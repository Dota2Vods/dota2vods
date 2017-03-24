import path from "path";
import mkdirpTmp from "mkdirp";
import { writeFile as writeFileTmp } from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import { clearStoreCache } from "./json-store";
import FileProvider from "./json-store/FileProvider";
import { promisify } from "bluebird";

import "ignore-styles";
import "./node-require-hacks";
import { getUrls as getUrlsTmp } from "./sitemap";
import App from "./App";

const mkdirp = promisify(mkdirpTmp);
const writeFile = promisify(writeFileTmp);
const getUrls = promisify(getUrlsTmp);

console.log("Building HTML...");

//Constants
const buildPath = path.resolve(__dirname, "..", "build");
const error404File = "404.html";

//Helper functions
const pathToAsset = (htmlFile, assetFile) => {
    if (path.basename(htmlFile) === error404File) { //We don't know where the 404 file will be embedded
        return path.join("/", assetFile);
    }

    return path.join(path.relative(path.dirname(htmlFile), buildPath), assetFile);
}

//Go
getUrls().then(urls => {
    urls.push("/" + error404File); //Special 404 file

    let filesWritten = 0;
    const filesToWrite = urls.length;

    for (const url of urls) {
        let filePath = path.join(buildPath, url);
        if (path.extname(filePath) !== ".html") {
            filePath = path.join(filePath, "index.html");
        }

        let context = {};
        const reactContent = ReactDOMServer.renderToString(
            <StaticRouter location={url} context={context}>
                <FileProvider dataFolder={path.join(buildPath, "data")}>
                    <App />
                </FileProvider>
            </StaticRouter>
        );
        const head = Helmet.rewind();
        const storeCache = clearStoreCache();

        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            ${head.title}
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">

            <link rel="stylesheet" href="${pathToAsset(filePath, "style.css")}">
        </head>
        <body>
            <div id="root">${reactContent}</div>

            <script>
                window.__JSON_STORE_CACHE__ = ${JSON.stringify(storeCache)};
            </script>
            <script src="${pathToAsset(filePath, "bundle.js")}"></script>
        </body>
        </html>`;

        mkdirp(path.dirname(filePath)).then(() => writeFile(filePath, html)).then(() => {
            filesWritten++;
            console.log(`${filesWritten}/${filesToWrite} - ${path.relative(buildPath, filePath)}`);

            if (filesWritten === filesToWrite) {
                console.log("Done!");
            }
        });
    }
});

import path from "path";
import mkdirpTmp from "mkdirp";
import { writeFile as writeFileTmp } from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import getAssetPaths from "./getAssetPaths";
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
const assetPaths = getAssetPaths(buildPath);
const blankFileUrl = "/200.html";

//Go
getUrls().then(urls => {
    function getFilePathByUrl(url) {
        let filePath = path.join(buildPath, url);

        //Create `index.html` if we have a folder
        if (filePath.endsWith("/")) {
            filePath = path.join(filePath, "index.html");
        }

        return filePath;
    }

    let filesWritten = 0;
    const filesToWrite = urls.length + 1; //` + 1` because blank file is not in the url list
    function writeContent(filePath, html) {
        mkdirp(path.dirname(filePath)).then(() => writeFile(filePath, html)).then(() => {
            filesWritten++;
            console.log(`${filesWritten}/${filesToWrite} - ${path.relative(buildPath, filePath)}`);

            if (filesWritten === filesToWrite) {
                console.log("Done!");
            }
        });
    }

    //Write special blank file
    //(Gets served if no file was found on the server and will then get populated by the client side react code)
    writeContent(getFilePathByUrl(blankFileUrl), "<!DOCTYPE html>" + ReactDOMServer.renderToStaticMarkup(
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href={assetPaths["css"]} />
            </head>
            <body>
                <div id="root" />
                <script src={assetPaths["js"]} />
            </body>
        </html>
    ));

    //Go over urls
    for (const url of urls) {
        const filePath = getFilePathByUrl(url);

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

            <link rel="stylesheet" href="${assetPaths["css"]}">
        </head>
        <body>
            <div id="root">${reactContent}</div>

            <script>
                window.__JSON_STORE_CACHE__ = ${JSON.stringify(storeCache)};
            </script>
            <script src="${assetPaths["js"]}"></script>
        </body>
        </html>`;

        writeContent(filePath, html);
    }
});

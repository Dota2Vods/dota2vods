import "ignore-styles";
import "./node-require-hacks";
import path from "path";
import { writeFileSync } from "fs";
import getUrls from "./getUrls";
import getAssetPaths from "../getAssetPaths";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import FileProvider from "../json-store/FileProvider";
import App from "../App";
import { clearStoreCache } from "../json-store";

console.log("Building HTML...");

//Constants
const buildPath = path.resolve(__dirname, "..", "..", "build");
const dataPath = path.join(buildPath, "data");
const fileStoreSaveFile = path.join(buildPath, "_html-pages.json");
const assetPaths = getAssetPaths(buildPath);
const blankFileUrl = "/200.html";

//This will hold all our files
const fileStore = {};
let lastPrefix = "";
function addFile(filePath, content) {
    fileStore[filePath] = content;

    const slashPosition = filePath.indexOf("/");
    const prefix = slashPosition < 0 ? filePath : filePath.substring(0, slashPosition);
    if (prefix !== lastPrefix) {
        console.log(`File store: Adding ${prefix}...`);
        lastPrefix = prefix;
    }
}

//Takes the generated react html code and returns it wrapped into a template
function wrapContent(content, helmet, jsonStoreCache) {
    return "<!DOCTYPE html>" + ReactDOMServer.renderToStaticMarkup(
        <html lang="en">
            <head>
                {helmet && helmet.title.toComponent()}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href={assetPaths["css"]} />
            </head>
            <body>
                <div id="root">%CONTENT%</div>
                {jsonStoreCache && (
                    <script>
                        window.__JSON_STORE_CACHE__ = %JSON_STORE_CACHE%;
                    </script>
                )}
                <script src={assetPaths["js"]} />
            </body>
        </html>
    ).replace("%CONTENT%", content || "").replace("%JSON_STORE_CACHE%", JSON.stringify(jsonStoreCache));
}

//Go
getUrls(dataPath).then(urls => {
    function urlToFilePath(url) {
        let filePath = url;

        //Create `index.html` if we have a folder
        if (filePath.endsWith("/")) {
            filePath = path.join(filePath, "index.html");
        }

        if (filePath[0] === "/") {
            filePath = filePath.substr(1);
        }

        return filePath;
    }


    //Write special blank file
    //(Gets served if no file was found on the server and will then get populated by the client side react code)
    addFile(urlToFilePath(blankFileUrl), wrapContent());

    //Go over urls
    for (const url of urls) {
        const content = ReactDOMServer.renderToString(
            <StaticRouter location={url} context={{}}>
                <FileProvider dataFolder={dataPath}>
                    <App />
                </FileProvider>
            </StaticRouter>
        );
        const helmet = Helmet.renderStatic();
        const jsonStoreCache = clearStoreCache();

        addFile(
            urlToFilePath(url),
            wrapContent(content, helmet, jsonStoreCache)
        );
    }

    //Save file store
    console.log(`All pages built (${Object.keys(fileStore).length} total)! Saving file store...`);
    const json = JSON.stringify(fileStore);
    writeFileSync(fileStoreSaveFile, json);
    console.log(`Done! (${Math.round(json.length / 1024 / 1024 * 100) / 100}MB written)`);
});

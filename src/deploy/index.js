import Promise from "bluebird";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { S3 } from "aws-sdk";
import mime from "mime";
import prefixSettings from "./prefixSettings";

Promise.promisifyAll(fs);

const buildFolder = path.resolve(__dirname, "..", "..", "build");
const fileStoreSaveFile = "_html-pages.json";
const defaultExtension = "html";
const Bucket = process.env.AWS_BUCKET;
const s3 = new S3();

async function readFolderRecursive(folder, fileList = []) {
    const files = await fs.readdirAsync(folder);
    for (const file of files) {
        const filePath = path.join(folder, file);
        const stats = await fs.statAsync(filePath);

        if (stats.isDirectory()) {
            await readFolderRecursive(filePath, fileList);
        }

        if (stats.isFile()) {
            fileList.push(path.relative(buildFolder, filePath));
        }
    }

    return fileList;
}

console.log("Loading local file store...");
const fileStore = require(path.join(buildFolder, fileStoreSaveFile));
const filesToDelete = [];

console.log("Adding assets, data and storybook files to it...");
readFolderRecursive(buildFolder).then(fileList => {
    for (const filePath of fileList) {
        if (filePath === fileStoreSaveFile) {
            continue;
        }

        fileStore[filePath] = null; //Null means that the file will be loaded from disk further below (saves some RAM)
    }

    console.log("Getting object list...");
    return s3.listObjectsV2({
        Bucket
    }).promise();
}).then(async data => {
    console.log("Checking for new or changed files...");
    for (const { Key: filePath, ETag: currentETag } of data.Contents) {
        if (typeof fileStore[filePath] === "undefined") {
            if (prefixSettings.get(filePath, "doNotDelete") !== true) {
                //Only mark file for deletion if we are supposed to
                filesToDelete.push(filePath);
            }
            continue;
        }

        //Check eTag
        let hash = crypto.createHash("md5");
        hash.setEncoding("hex");
        if (fileStore[filePath] === null) {
            await new Promise((resolve, reject) => {
                const fd = fs.createReadStream(path.join(buildFolder, filePath));
                fd.on("end", resolve);
                fd.pipe(hash);
            });
        } else {
            hash.update(fileStore[filePath]);
        }
        hash.end();

        const newETag = JSON.stringify(hash.read());
        if (newETag === currentETag) {
            //Remove file from file store if it doesn't need to get updated
            delete fileStore[filePath];
        }
    }
}).then(async () => {
    let filePaths = Object.keys(fileStore);
    console.log(`${filePaths.length} files selected for upload.`
        + ` ${filesToDelete.length} files will get removed.`); //Removing sounds less risky than deleting imo

    if (filePaths.length === 0) {
        return;
    }

    console.log("Sorting files for upload...");
    prefixSettings.sortFilesByPrefixUploadOrder(filePaths);

    console.log("Uploading new files...");
    for (const filePath of filePaths) {
        let fileContent = fileStore[filePath];
        if (fileContent === null) {
            fileContent = fs.createReadStream(path.join(buildFolder, filePath));
        }

        console.log(`Uploading ${filePath}...`);
        const extensionPosition = filePath.lastIndexOf(".");
        await s3.putObject({
            Bucket,
            Key: filePath,
            ACL: prefixSettings.get(filePath, "acl"),
            Body: fileContent,
            CacheControl: prefixSettings.get(filePath, "cacheControl"),
            ContentType: mime.getType(extensionPosition >= 0 ? filePath.substr(extensionPosition) : defaultExtension),
            StorageClass: prefixSettings.get(filePath, "storageClass")
        }).promise();
    }
}).then(() => {
    if (filesToDelete.length === 0) {
        return;
    }

    console.log("Removing obsolete files...");
    return s3.deleteObjects({
        Bucket,
        Delete: {
            Objects: filesToDelete.map(filePath => ({
                Key: filePath
            }))
        }
    }).promise();
}).then(() => console.log("Done!"));

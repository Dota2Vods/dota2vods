import path from "path";
import { readFileSync } from "fs";
import AbstractProvider from "./AbstractProvider";

//Process wide fs cache (The json files wont change during a build)
let jsonCache = {};
function parseJSONFile(filePath) {
    if (!jsonCache[filePath]) {
        jsonCache[filePath] = JSON.parse(readFileSync(filePath));
    }

    return jsonCache[filePath];
}

export default class FileProvider extends AbstractProvider {
    get(jsonFile) {
        const dataFolder = this.props.dataFolder;
        const filePath = path.join(dataFolder, jsonFile.replace(".", "")) + ".json";

        try {
            return parseJSONFile(filePath);
        } catch (error) {
            return false;
        }
    }
}

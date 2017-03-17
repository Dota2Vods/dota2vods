import path from "path";
import { readFileSync } from "fs";
import AbstractProvider from "./AbstractProvider";

export default class FileProvider extends AbstractProvider {
    get(jsonFile) {
        const dataFolder = this.props.dataFolder;
        const filePath = path.join(dataFolder, jsonFile.replace(".", "")) + ".json";

        return JSON.parse(readFileSync(filePath));
    }
}

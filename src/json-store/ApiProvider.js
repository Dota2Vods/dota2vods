import AbstractProvider from "./AbstractProvider";

export default class ApiProvider extends AbstractProvider {
    get(jsonFile) {
        const dataUrl = this.props.dataUrl;
        const fileUrl = [dataUrl, jsonFile.replace(".", "")].join("/") + ".json";

        return fetch(fileUrl).then(response => response.json());
    }
}

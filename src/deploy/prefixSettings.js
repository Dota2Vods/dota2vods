const defaultSettings = {
    doNotDelete: false,
    acl: "public-read",
    cacheControl: "public, max-age=31536000, no-cache",
    storageClass: "REDUCED_REDUNDANCY"
};

const prefixSettings = [
    {
        prefix: "assets/",
        doNotDelete: true,
        cacheControl: "public, max-age=31536000"
    }
];

const prefixUploadOrder = [
    "assets/",
    "data/",
    "",
    "storybook/"
];

module.exports.get = (filePath, settingKey) => {
    let setting = defaultSettings[settingKey];

    for (const prefixSetting of prefixSettings) {
        if (filePath.startsWith(prefixSetting.prefix) && typeof prefixSetting[settingKey] !== "undefined") {
            setting = prefixSetting[settingKey];
        }
    }

    return setting;
}

function findPrefixIndex(filePath) {
    let index = -1;
    let selectedPrefixLength = -1;
    for (const prefix of prefixUploadOrder) {
        if (
            filePath.startsWith(prefix)
            && prefix.length > selectedPrefixLength //We compare the prefix length so that, in case two prefixes match
                                                    //the file path, the more detailed prefix wins.
        ) {
            index = prefixUploadOrder.indexOf(prefix);
            selectedPrefixLength = prefix.length;
        }
    }

    return index;
}

module.exports.sortFilesByPrefixUploadOrder = files => files.sort((fileA, fileB) => {
    const prefixCompare = findPrefixIndex(fileA) - findPrefixIndex(fileB);
    if (prefixCompare !== 0) {
        return prefixCompare;
    }

    return fileA.localeCompare(fileB);
});

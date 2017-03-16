export function getUrls(callback) {
    let paths = [
        "/",
        "/about"
    ];

    process.nextTick(() => callback(null, paths));
}

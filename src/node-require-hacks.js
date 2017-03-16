import path from "path";
import { readFileSync } from "fs";
import requireHacker from "require-hacker";
import marked from "marked";

//Simulate markdown-loader
requireHacker.global_hook('markdown', (requirePath, module) => {
    if (!requirePath.endsWith('.md')) {
        return
    }

    const filePath = path.resolve(path.dirname(module.filename), requirePath);
    return {
        path: filePath,
        source: `module.exports = ${JSON.stringify(marked(readFileSync(filePath).toString()))}`
    };
});

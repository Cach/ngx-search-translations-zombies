"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeOutputFile = exports.readFiles = exports.readDir = exports.readJsonFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readJsonFile = (filename) => {
    try {
        return JSON.parse(fs_1.default.readFileSync(filename, 'utf8'));
    }
    catch (e) {
        return null;
    }
};
exports.readJsonFile = readJsonFile;
const readDir = (startPath, filter) => {
    if (!fs_1.default.existsSync(startPath)) {
        return [];
    }
    const files = fs_1.default.readdirSync(startPath);
    return files.map((file) => {
        const filename = path_1.default.join(startPath, file);
        const stat = fs_1.default.lstatSync(filename);
        if (stat.isDirectory()) {
            return (0, exports.readDir)(filename, filter).flat();
        }
        else if (filter.includes(path_1.default.extname(filename))) {
            return filename;
        }
        else {
            return [];
        }
    });
};
exports.readDir = readDir;
const readFiles = (dir, extensions) => {
    return new Promise((resolve) => {
        const files = (0, exports.readDir)(dir, extensions).flat();
        resolve(files);
    });
};
exports.readFiles = readFiles;
const writeOutputFile = (filename, data) => {
    if (!filename) {
        return;
    }
    const content = data.join('\n');
    try {
        fs_1.default.writeFileSync(filename, content);
    }
    catch (err) {
        console.error(err);
    }
};
exports.writeOutputFile = writeOutputFile;
//# sourceMappingURL=filesystem.utils.js.map
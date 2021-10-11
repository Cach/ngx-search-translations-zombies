#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const filesystem_utils_1 = require("./utils/filesystem.utils");
const regexp_utils_1 = require("./utils/regexp.utils");
const translations_utils_1 = require("./utils/translations.utils");
const CONFIG_FILE = '.zombiesconfig';
let config = {
    searchDir: './src',
    searchExtensions: ['.html'],
    showEmptyKeys: false,
    showTotalCount: false,
    translationFile: './translation.json'
};
const loadConfig = () => {
    return new Promise((resolve, reject) => {
        const config = (0, filesystem_utils_1.readJsonFile)(CONFIG_FILE);
        if (config) {
            resolve(config);
        }
        reject(`File ${CONFIG_FILE} is empty or not exist`);
    });
};
const searchInFile = (filename, text) => {
    return new Promise((resolve) => {
        try {
            const fileData = fs_1.default.readFileSync(filename, 'utf8');
            const result = fileData === null || fileData === void 0 ? void 0 : fileData.toString().match((0, regexp_utils_1.makeRegExp)(text));
            resolve(result);
        }
        catch (e) {
            resolve(false);
        }
    });
};
const searchZombies = () => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const files = yield (0, filesystem_utils_1.readFiles)(config.searchDir, config.searchExtensions);
        const exclude = {
            keys: config.excludeKeys || [],
            keysStarts: config.excludeKeysStarts || [],
            keysEnds: config.excludeKeysEnds || []
        };
        const translations = yield (0, translations_utils_1.readTranslations)(config.translationFile, exclude);
        const zombies = [];
        for (const translateKey of translations) {
            const search = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                const isFound = yield searchInFile(file, translateKey);
                if (isFound) {
                    return true;
                }
            }));
            const exist = (yield Promise.all(search)).some((item) => item);
            if (!exist) {
                zombies.push(translateKey);
            }
        }
        resolve(zombies);
    }));
};
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        config = yield loadConfig();
    }
    catch (e) {
        throw new Error(e);
    }
    const zombies = yield searchZombies();
    if (config.outputFile) {
        (0, filesystem_utils_1.writeOutputFile)(config.outputFile, zombies);
    }
    if (config.showEmptyKeys) {
        zombies.forEach((key) => console.log(key));
    }
    if (config.showTotalCount) {
        console.log(`Total: ${zombies.length}`);
    }
});
run();
//# sourceMappingURL=index.js.map
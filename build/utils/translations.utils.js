"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTranslations = exports.makeTranslationKey = void 0;
const filesystem_utils_1 = require("./filesystem.utils");
const makeTranslationKey = (data, parentKey = '') => {
    return Object.keys(data).map((key) => {
        const value = data[key];
        if (typeof value === 'string') {
            if (parentKey === null || parentKey === void 0 ? void 0 : parentKey.length) {
                return `${parentKey}.${key}`;
            }
            return key;
        }
        const prefix = (parentKey === null || parentKey === void 0 ? void 0 : parentKey.length) ? `${parentKey}.${key}` : key;
        return (0, exports.makeTranslationKey)(value, prefix).flat();
    });
};
exports.makeTranslationKey = makeTranslationKey;
const readTranslations = (file, exclude) => {
    return new Promise((resolve) => {
        var _a, _b, _c;
        const dataJson = (0, filesystem_utils_1.readJsonFile)(file);
        if (!dataJson) {
            throw new Error('File is empty');
        }
        const translations = (0, exports.makeTranslationKey)(dataJson).flat();
        if (((_a = exclude.keys) === null || _a === void 0 ? void 0 : _a.length) || ((_b = exclude.keysEnds) === null || _b === void 0 ? void 0 : _b.length) || ((_c = exclude.keysStarts) === null || _c === void 0 ? void 0 : _c.length)) {
            const filtered = translations.filter((item) => {
                var _a, _b, _c;
                return !((_a = exclude.keys) === null || _a === void 0 ? void 0 : _a.includes(item))
                    && ((_b = exclude.keysStarts) === null || _b === void 0 ? void 0 : _b.every((start) => !item.startsWith(start)))
                    && ((_c = exclude.keysEnds) === null || _c === void 0 ? void 0 : _c.every((end) => !item.endsWith(end)));
            });
            resolve(filtered);
            return;
        }
        resolve(translations);
    });
};
exports.readTranslations = readTranslations;
//# sourceMappingURL=translations.utils.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRegExp = void 0;
const makeRegExp = (value) => {
    return new RegExp(`['|"]${value.replace(/\./gi, '\\.')}['|"]`, 'gi');
};
exports.makeRegExp = makeRegExp;
//# sourceMappingURL=regexp.utils.js.map
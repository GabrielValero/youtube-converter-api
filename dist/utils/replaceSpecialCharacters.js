"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = replaceSpecialCharacters;
const specialCharacters_js_1 = require("../config/specialCharacters.js");
function replaceSpecialCharacters(str) {
    const characters = { specialCharacters: specialCharacters_js_1.default };
    var pattern = /&([a-zA-Z0-9]+);|&#39;/g;
    var match = pattern.exec(str);
    while (match != null) {
        pattern.lastIndex = 0;
        str = str.replaceAll(match[0], characters.specialCharacters[match[0].toUpperCase()].characters);
        match = pattern.exec(str);
    }
    return str;
}
//# sourceMappingURL=replaceSpecialCharacters.js.map
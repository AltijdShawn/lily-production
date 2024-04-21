(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./winkdiceConf", "./chatbots"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findMap = exports.chatbotsConfig = exports.WinkDiceConfig = void 0;
    var winkdiceConf_1 = require("./winkdiceConf");
    Object.defineProperty(exports, "WinkDiceConfig", { enumerable: true, get: function () { return winkdiceConf_1.WinkDiceConfig; } });
    var chatbots_1 = require("./chatbots");
    Object.defineProperty(exports, "chatbotsConfig", { enumerable: true, get: function () { return chatbots_1.chatbotsConfig; } });
    Object.defineProperty(exports, "findMap", { enumerable: true, get: function () { return chatbots_1.findMap; } });
});
//# sourceMappingURL=index.js.map
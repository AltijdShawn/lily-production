(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./FlagEngine", "./arrayStuff", "./timeformat"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.secondsToString = exports.getFromArray = exports.removeFromArray = exports.FlagEngine = exports.parseArgsStringToArgv = void 0;
    var FlagEngine_1 = require("./FlagEngine");
    Object.defineProperty(exports, "parseArgsStringToArgv", { enumerable: true, get: function () { return FlagEngine_1.parseArgsStringToArgv; } });
    Object.defineProperty(exports, "FlagEngine", { enumerable: true, get: function () { return FlagEngine_1.FlagEngine; } });
    var arrayStuff_1 = require("./arrayStuff");
    Object.defineProperty(exports, "removeFromArray", { enumerable: true, get: function () { return arrayStuff_1.removeFromArray; } });
    Object.defineProperty(exports, "getFromArray", { enumerable: true, get: function () { return arrayStuff_1.getFromArray; } });
    var timeformat_1 = require("./timeformat");
    Object.defineProperty(exports, "secondsToString", { enumerable: true, get: function () { return timeformat_1.secondsToString; } });
});
//# sourceMappingURL=index.js.map
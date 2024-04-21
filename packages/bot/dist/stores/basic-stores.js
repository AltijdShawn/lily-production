(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "discord.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.basicStores = void 0;
    const discord_js_1 = require("discord.js");
    exports.basicStores = {
        commands: new discord_js_1.Collection(),
        counters: new discord_js_1.Collection()
    };
});
//# sourceMappingURL=basic-stores.js.map
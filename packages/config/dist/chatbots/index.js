(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./client", "./tokens", "./maps"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findMap = exports.chatbotsConfig = void 0;
    const client_1 = require("./client");
    const tokens_1 = require("./tokens");
    const maps_1 = require("./maps");
    const cfg = Object.assign(Object.assign({ client: client_1.client }, tokens_1.tokens), { channelmap: maps_1.channelmap });
    exports.chatbotsConfig = cfg;
    function findMap(client, id) {
        let Target = 0;
        cfg.channelmap.forEach((item, index) => {
            if (item[client] == id)
                return (Target = index);
            else
                return;
        });
        return Target;
    }
    exports.findMap = findMap;
});
//# sourceMappingURL=index.js.map
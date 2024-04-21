(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../CmdClient", "../../stores/basic-stores"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CmdClient_1 = require("../../CmdClient");
    const basic_stores_1 = require("../../stores/basic-stores");
    const store = basic_stores_1.basicStores;
    const cmd = {
        name: "test",
        aliases: [],
        execute: (msg, args, cmd, platform, extra) => {
            const { fw_, config, fnv, stateHolder } = extra;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            const Emb = new _.Embed().setTitle("hi").setDescription("uwu");
            _.msg.msg.reply({
                content: "# Hi\r\n`UwU`",
                embeds: [Emb],
            });
        },
    };
    exports.default = cmd;
});
//# sourceMappingURL=test-example.js.map
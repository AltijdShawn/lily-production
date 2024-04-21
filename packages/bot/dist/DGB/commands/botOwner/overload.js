(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../CmdClient", "../../../stores/basic-stores", "../.."], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CmdClient_1 = require("../../../CmdClient");
    const basic_stores_1 = require("../../../stores/basic-stores");
    const __1 = require("../..");
    const store = basic_stores_1.basicStores;
    const cmd = {
        name: "overload",
        aliases: [],
        execute: (msg, args, cmd, platform, extra) => {
            const { fw_, config, fnv, stateHolder } = extra;
            const { ToggleSpam } = fnv;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            const mesg = args.slice(1, args.length);
            if (!__1.discConfig.privilegedUsers.includes(msg.author.id))
                return msg.reply("You are not privileged to use this command");
            else {
                ToggleSpam({
                    chatId: 0,
                    sendBy: "",
                    target: "main",
                    content: "",
                    cmd: "",
                    args_meta: [""],
                    args: [""],
                }, fw_);
                msg.reply(`Spam loop is set to ${stateHolder.spam}`);
                return;
            }
        },
    };
    exports.default = cmd;
});
//# sourceMappingURL=overload.js.map
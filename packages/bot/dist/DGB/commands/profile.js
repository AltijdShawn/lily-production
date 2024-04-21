var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../CmdClient", "../../stores/basic-stores", "../mongo_usermaps"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CmdClient_1 = require("../../CmdClient");
    const basic_stores_1 = require("../../stores/basic-stores");
    const mongo_usermaps_1 = require("../mongo_usermaps");
    const store = basic_stores_1.basicStores;
    const cmd = {
        name: "profile",
        aliases: ["userinfo", "ui", "user"],
        execute: (msg, args, cmd, platform, extra) => __awaiter(void 0, void 0, void 0, function* () {
            const { fw_, config, fnv, stateHolder } = extra;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            const mention = platform == "discord" ? msg.mentions : msg.mentions;
            let id = "";
            if (args[1] == null || args[1] == undefined)
                id = msg.author.id;
            else if (mention != undefined || mention != null)
                platform == "discord" ? id = mention.members.first().id : id = mention.users[0].id;
            else
                id = args[1];
            let data = null;
            if (mention != undefined || mention != null)
                data = yield (0, mongo_usermaps_1.getData)(platform, id);
            else if (args[1] == null || args[1] == undefined)
                data = yield (0, mongo_usermaps_1.getData)(platform, id);
            else
                data = yield (0, mongo_usermaps_1.getData)("prof_id", id);
            if (data == null)
                return msg.reply(`this user doesn't have a profile!`);
            else
                return resp();
            function resp() {
                try {
                    msg.reply({
                        embeds: [
                            new _.Embed()
                                .setTitle("UserInfo")
                                .setColor(0xFFaaBF)
                                .addFields([
                                { name: "Description", value: data.description || "none" },
                                { name: "xp", value: String(data.total_xp), inline: true },
                                { name: "level", value: String(data.level), inline: true },
                            ])
                        ]
                    });
                }
                catch (e) {
                    return console.log(e);
                }
            }
        }),
    };
    exports.default = cmd;
});
//# sourceMappingURL=profile.js.map
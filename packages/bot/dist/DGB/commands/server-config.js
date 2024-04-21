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
        define(["require", "exports", "discord.js", "../../CmdClient", "@daydrm-studios/chatbot-utils", "../../stores/basic-stores", ".."], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const discord_js_1 = require("discord.js");
    const CmdClient_1 = require("../../CmdClient");
    const chatbot_utils_1 = require("@daydrm-studios/chatbot-utils");
    const basic_stores_1 = require("../../stores/basic-stores");
    const __1 = require("..");
    const store = basic_stores_1.basicStores;
    const cmd = {
        name: "server-config",
        aliases: ["serverConf", "servercfg", "scfg"],
        execute: (msg, args, cmd, platform, extra) => __awaiter(void 0, void 0, void 0, function* () {
            const { fw_, config, fnv, stateHolder } = extra;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            const mesg = _.msg.msg;
            const channelId = platform == "discord" ? mesg.channel.id : mesg.channelId;
            let perm;
            if (platform == "discord")
                perm = _.msg.msg.member.permissions.has(discord_js_1.PermissionsBitField.Flags.ManageGuild);
            if (platform == "discord" && perm == false)
                perm = _.msg.msg.member.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator);
            if (platform == "guilded")
                perm = _.msg.msg.member.isOwner;
            else
                perm = false;
            if (perm == false)
                return msg.reply("insufficient permissions");
            if (args[1] == "channels") {
                if (args[2] == "NSFW" || args[2] == "nsfw") {
                    if (args[3] == "Add" || args[3] == "add") {
                        if (!args[4])
                            fw_.database.push("channels.nsfw", channelId);
                        else if (__1.discConfig.privilegedUsers.includes(msg.author.id))
                            fw_.database.push("channels.nsfw", args[4]);
                        else
                            return msg.reply("If you see this message and you are not an admin (or owner) of this guild/server then you either didn't trigger the message or you have done the impossible, anyways... basically the only one who should be able to add or remove channels to the list by ID is the bots developer!");
                        const id = !args[4] ? channelId : args[4];
                        return msg.reply(`Added \`${id}\` to the NSFW channel registry`);
                    }
                    if (args[3] == "Remove" || args[3] == "remove") {
                        let arr = [];
                        if (!args[4])
                            arr = (0, chatbot_utils_1.removeFromArray)(yield fw_.database.get("channels.nsfw"), channelId);
                        else if (__1.discConfig.privilegedUsers.includes(msg.author.id))
                            fw_.database.push("channels.nsfw", args[4]);
                        else
                            return msg.reply("If you see this message and you are not an admin (or owner) of this guild/server then you either didn't trigger the message or you have done the impossible, anyways... basically the only one who should be able to add or remove channels to the list by ID is the bots developer!");
                        fw_.database.set("channels.nsfw", arr);
                        const id = !args[4] ? channelId : args[4];
                        return msg.reply(`Removed \`${id}\` from the NSFW channel registry`);
                    }
                    else
                        return logNoValidOptions();
                }
                else
                    return logNoValidOptions();
            }
            else
                return logNoValidOptions();
            function logNoValidOptions() {
                return msg.reply("No Valid options were provided");
            }
        }),
    };
    exports.default = cmd;
});
//# sourceMappingURL=server-config.js.map
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
        define(["require", "exports", "../mongo_usermaps", "../../CmdClient", "../../stores/basic-stores", ".."], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const mongo_usermaps_1 = require("../mongo_usermaps");
    const CmdClient_1 = require("../../CmdClient");
    const basic_stores_1 = require("../../stores/basic-stores");
    const __1 = require("..");
    const store = basic_stores_1.basicStores;
    const cmd = {
        name: "user-config",
        aliases: ["userConf", "usercfg", "ucfg"],
        execute: (msg, args, cmd, platform, extra) => __awaiter(void 0, void 0, void 0, function* () {
            const { fw_, config, fnv, stateHolder } = extra;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            const mesg = _.msg.msg;
            const channelId = platform == "discord" ? mesg.channel.id : mesg.channelId;
            if (args[1] == "profile") {
                if (args[2] == "delete") {
                    const exists = yield (0, mongo_usermaps_1.getData)(platform, msg.author.id);
                    if (exists == null)
                        return msg.reply(`You don't have a profile yet, please create one with \`${__1.discConfig.prefix}ucfg profile create\``);
                    yield (0, mongo_usermaps_1.deleteData)(exists["prof_id"]);
                    msg.reply(`successfully deleted your profile!\n\n` + `\`${JSON.stringify(yield (0, mongo_usermaps_1.getData)(platform, msg.author.id))}\``);
                }
                else if (args[2] == "create") {
                    const exists = yield (0, mongo_usermaps_1.getData)(platform, msg.author.id);
                    if (exists != null)
                        return msg.reply(`you are already registered!\nyour profile id is \`${exists["prof_id"]}\`!`);
                    else {
                        const prof_id = yield newProfID();
                        const platformId = msg.author.id;
                        const xp = 0;
                        const otherPlatform = platform == "discord" ? "guilded" : "discord";
                        const otherPlatformId = "";
                        const description = "";
                        const obj = {
                            prof_id,
                            total_xp: xp,
                            level_xp: xp,
                            level: 0,
                            description,
                            [platform]: platformId,
                            [otherPlatform]: otherPlatformId
                        };
                        yield (0, mongo_usermaps_1.setData)(prof_id, obj);
                        return msg.reply(`profile created!\n\n` + `\`${JSON.stringify(yield (0, mongo_usermaps_1.getData)(platform, msg.author.id))}\``);
                    }
                }
                else if (args[2] == "addid") {
                    if (!args[3])
                        return logNoValidOptions();
                    const exists = yield (0, mongo_usermaps_1.getData)(platform, msg.author.id);
                    if (exists == null)
                        return msg.reply(`You don't have a profile yet, please create one with \`${__1.discConfig.prefix}ucfg profile create\``);
                    const prof_id = exists["prof_id"];
                    const otherPlatform = platform == "discord" ? "guilded" : "discord";
                    yield (0, mongo_usermaps_1.setMap)(prof_id, otherPlatform, args[3]);
                    msg.reply(`successfully edited your profile!\n\n` + `\`${JSON.stringify(yield (0, mongo_usermaps_1.getData)(platform, msg.author.id))}\``);
                }
                else if (args[2] == "edit") {
                    const exists = yield (0, mongo_usermaps_1.getData)(platform, msg.author.id);
                    if (exists == null)
                        return msg.reply(`You don't have a profile yet, please create one with \`${__1.discConfig.prefix}ucfg profile create\``);
                    const prof_id = exists["prof_id"];
                    const otherPlatform = platform == "discord" ? "guilded" : "discord";
                    if (!args[3])
                        return logNoValidOptions();
                    if (["total_xp", "level_xp", "prof_id", platform].includes(args[3])) {
                        if (args[3] == platform)
                            return msg.reply(`if you edit this and \`"${otherPlatform}"\` isn't set to the right value, then you will lose this profile... that's why we prevent you from doing this`);
                        if (args[3] == "prof_id")
                            return msg.reply(`this is a value that the bot uses to recognise you and cannot be changed`);
                        if (args[3] == "total_xp")
                            return msg.reply("you're smart.... but not *That* smart!");
                        if (args[3] == "level_xp")
                            return msg.reply("you're smart.... but not *That* smart!");
                    }
                    else {
                        if (!args[4])
                            return logNoValidOptions();
                        yield (0, mongo_usermaps_1.setMap)(prof_id, args[3], args.slice(4, args.length).join(" "));
                        msg.reply(`successfully edited your profile!\n\n` + `\`${JSON.stringify(yield (0, mongo_usermaps_1.getData)(platform, msg.author.id))}\``);
                    }
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
    function newProfID() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = makeid(16);
            const exists = yield (0, mongo_usermaps_1.getData)("prof_id", id);
            if (exists == null)
                return id;
            else
                return yield newProfID();
        });
    }
    function makeid(length) {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
});
//# sourceMappingURL=user-config.js.map
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
        define(["require", "exports", "../../../CmdClient", "../../../stores/basic-stores", "../..", "../../mongo_usermaps"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CmdClient_1 = require("../../../CmdClient");
    const basic_stores_1 = require("../../../stores/basic-stores");
    const __1 = require("../..");
    const mongo_usermaps_1 = require("../../mongo_usermaps");
    const store = basic_stores_1.basicStores;
    const cmd = {
        name: "adm_ucfg",
        aliases: ["ucfg-admim", "uia"],
        execute: (msg, args, cmd, platform, extra) => __awaiter(void 0, void 0, void 0, function* () {
            const { fw_, config, fnv, stateHolder } = extra;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            if (!__1.discConfig.privilegedUsers.includes(msg.author.id))
                return msg.reply("You are not privileged to use this command");
            const mention = platform == "discord" ? msg.mentions : msg.mentions;
            let id = "";
            if (args[1] == null || args[1] == undefined)
                return msg.reply("you need to give me either a profile ID or you need to mention the target user!");
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
                data == (yield (0, mongo_usermaps_1.getData)("prof_id", id)) && platform == "prof_id";
            return resp();
            function resp() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (args[2] == "profile") {
                            if (args[3] == "delete") {
                                const exists = yield (0, mongo_usermaps_1.getData)(platform, id);
                                if (exists == null)
                                    return msg.reply(`You don't have a profile yet, please create one with \`${__1.discConfig.prefix}ucfg profile create\``);
                                yield (0, mongo_usermaps_1.deleteData)(exists["prof_id"]);
                                msg.reply(`successfully deleted the user's profile!\n\n` + `\`${JSON.stringify(yield (0, mongo_usermaps_1.getData)(platform, id))}\``);
                            }
                            else if (args[3] == "create") {
                                const exists = yield (0, mongo_usermaps_1.getData)(platform, id);
                                if (exists != null)
                                    return msg.reply(`you are already registered!\nthe user's profile id is \`${exists["prof_id"]}\`!`);
                                else {
                                    const prof_id = yield newProfID();
                                    const platformId = id;
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
                                    return msg.reply(`profile created!\n\n` + `\`${JSON.stringify(yield (0, mongo_usermaps_1.getData)(platform, id))}\``);
                                }
                            }
                            else if (args[3] == "addid") {
                                if (!args[4])
                                    return logNoValidOptions();
                                const exists = yield (0, mongo_usermaps_1.getData)(platform, id);
                                if (exists == null)
                                    return msg.reply(`You don't have a profile yet, please create one with \`${__1.discConfig.prefix}ucfg profile create\``);
                                const prof_id = exists["prof_id"];
                                const otherPlatform = platform == "discord" ? "guilded" : "discord";
                                yield (0, mongo_usermaps_1.setMap)(prof_id, otherPlatform, args[4]);
                                msg.reply(`successfully edited the user's profile!\n\n` + `\`${JSON.stringify(yield (0, mongo_usermaps_1.getData)(platform, id))}\``);
                            }
                            else if (args[3] == "edit") {
                                const exists = yield (0, mongo_usermaps_1.getData)(platform, id);
                                if (exists == null)
                                    return msg.reply(`You don't have a profile yet, please create one with \`${__1.discConfig.prefix}ucfg profile create\``);
                                const prof_id = exists["prof_id"];
                                const otherPlatform = platform == "discord" ? "guilded" : "discord";
                                if (!args[4])
                                    return logNoValidOptions();
                                else {
                                    if (!args[5])
                                        return logNoValidOptions();
                                    yield (0, mongo_usermaps_1.setMap)(prof_id, args[4], args.slice(5, args.length).join(" "));
                                    msg.reply(`successfully edited the user's profile!\n\n` + `\`${JSON.stringify(yield (0, mongo_usermaps_1.getData)(platform, id))}\``);
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
                    }
                    catch (e) {
                        return console.log(e);
                    }
                });
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
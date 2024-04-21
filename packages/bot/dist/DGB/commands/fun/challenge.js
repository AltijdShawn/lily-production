var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../CmdClient", "../../../stores/basic-stores", "axios", "@daydrm-studios/chatbot-config", "../../utils/level"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CmdClient_1 = require("../../../CmdClient");
    const basic_stores_1 = require("../../../stores/basic-stores");
    const axios_1 = __importDefault(require("axios"));
    const chatbot_config_1 = require("@daydrm-studios/chatbot-config");
    const level_1 = require("../../utils/level");
    const store = basic_stores_1.basicStores;
    const cmd = {
        name: "challenge",
        aliases: ["quest"],
        execute: (msg, args, cmd, platform, extra) => __awaiter(void 0, void 0, void 0, function* () {
            const { fw_, config, fnv, stateHolder } = extra;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            const mesg = _.msg.msg;
            msg.reply("Waiting for response...");
            const msgTime = msg.createdAt.getTime();
            const d = new Date(msgTime);
            const dateTag = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
            yield axios_1.default
                .get(`${chatbot_config_1.WinkDiceConfig.REST_API_Endpoint}/api/challenge/${dateTag}`)
                .then((response) => {
                const data = response.data;
                const startDate = data["dateBoundries"]["start"];
                const endDate = data["dateBoundries"]["end"];
                function output() {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (!args[1])
                            return msg.reply({
                                embeds: [
                                    new _.Embed()
                                        .setTitle("Todays (" + data.date + ") quest/challenge!")
                                        .setColor(0x42a69f)
                                        .setDescription(data.question),
                                ],
                            });
                        else {
                            if (data.answer == null)
                                return msg.reply(`There is no answer set unfortunately`);
                            if (data.answer.includes(args.splice(1, args.length).join(" ").toLowerCase())) {
                                msg.reply(`Congrats! you guessed it!\n\n**\`+100xp\`**`);
                                (0, level_1.giveXP)(msg, platform, 100);
                            }
                            else
                                return msg.reply(`:x: wrong!`);
                        }
                    });
                }
                output();
            })
                .catch((e) => {
                _.msg.msg.reply({
                    embeds: [
                        new _.Embed()
                            .setColor(0xffaa33)
                            .setTitle("Couldn't display quest/challenge")
                            .setDescription("Was not able to find a quest here!"),
                    ],
                });
            });
        }),
    };
    exports.default = cmd;
});
//# sourceMappingURL=challenge.js.map
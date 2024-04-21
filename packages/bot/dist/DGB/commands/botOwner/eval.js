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
        define(["require", "exports", "../../../CmdClient", "@daydrm-studios/chatbot-utils", "../../../stores/basic-stores", "../..", "../../mongo_usermaps", "axios"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CmdClient_1 = require("../../../CmdClient");
    const chatbot_utils_1 = require("@daydrm-studios/chatbot-utils");
    const basic_stores_1 = require("../../../stores/basic-stores");
    const __1 = require("../..");
    const mongo_usermaps_1 = require("../../mongo_usermaps");
    const axios_1 = __importDefault(require("axios"));
    const store = basic_stores_1.basicStores;
    const cmd = {
        name: "eval",
        aliases: ["exec", "execute", "evaluate"],
        execute: (msg, args, cmd, platform, extra) => __awaiter(void 0, void 0, void 0, function* () {
            const { fw_, config, fnv } = extra;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            const ax = axios_1.default;
            const delData = mongo_usermaps_1.deleteData;
            const sData = mongo_usermaps_1.setData;
            const gData = mongo_usermaps_1.getData;
            const sMap = mongo_usermaps_1.setMap;
            const timeFormat = chatbot_utils_1.secondsToString;
            const rFA = chatbot_utils_1.removeFromArray;
            const gFA = chatbot_utils_1.getFromArray;
            let enableEvalOutput = true;
            function blockOutput() { return; }
            const mesg = args.slice(1, args.length);
            if (!__1.discConfig.privilegedUsers.includes(msg.author.id))
                return msg.reply("You are not privileged to use this command");
            else {
                try {
                    const codeExec = (c) => __awaiter(void 0, void 0, void 0, function* () { return yield eval(c); });
                    const code = args.splice(1, args.length).join(" ");
                    if (code.startsWith("blockOutput()"))
                        enableEvalOutput = false;
                    if (code.length && code.length > 1)
                        return execute();
                    else
                        throw new Error("code is too short!");
                    function execute() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (enableEvalOutput == false) {
                                return yield codeExec(code);
                            }
                            else
                                return msg.reply({
                                    embeds: [
                                        new _.Embed()
                                            .setTitle("Eval")
                                            .setColor(0xaaFF33)
                                            .setDescription(`\`\`\`js\r\n\r${yield codeExec(code)}\r\n\r\`\`\``)
                                    ]
                                });
                        });
                    }
                }
                catch (e) {
                    msg.reply({
                        embeds: [
                            new _.Embed()
                                .setTitle("Eval")
                                .setColor(0xFF3333)
                                .setDescription(`\`\`\`js\r\n\r${Process(e)}\r\n\r\`\`\``)
                        ]
                    });
                    function Process(e_) {
                        let name = "";
                        let msg = "";
                        let errors = [""];
                        let returns = "";
                        if (e_.message)
                            msg = e_.message;
                        if (e_.name)
                            name = e_.name;
                        if (e_.errors)
                            errors = e_.errors;
                        returns = `${name}: ${msg}\n${errors}`;
                        if ((!e_.message) && (!e_.name) && (!e_.errors))
                            returns = e_;
                        return returns;
                    }
                }
            }
        }),
    };
    exports.default = cmd;
});
//# sourceMappingURL=eval.js.map
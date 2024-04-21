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
        define(["require", "exports", "../../../CmdClient", "@daydrm-studios/chatbot-utils", "../../../stores/basic-stores", "../..", "axios", "@daydrm-studios/chatbot-config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CmdClient_1 = require("../../../CmdClient");
    const chatbot_utils_1 = require("@daydrm-studios/chatbot-utils");
    const basic_stores_1 = require("../../../stores/basic-stores");
    const __1 = require("../..");
    const axios_1 = __importDefault(require("axios"));
    const chatbot_config_1 = require("@daydrm-studios/chatbot-config");
    const store = basic_stores_1.basicStores;
    const cmd = {
        name: "report",
        aliases: ["newbug"],
        execute: (msg, args, cmd, platform, extra) => __awaiter(void 0, void 0, void 0, function* () {
            const { fw_, config, fnv } = extra;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            const mesg = _.msg.msg;
            const PossiblePlatforms = ["discord", "guilded", "minecraft-lifesteal", "roblox-citylife", "xim", "winkdice"];
            _.reply(`
    [MESSAGE FROM THE DEV]
    Long and descriptive reports should not be done through here since chat programs like discord and guilded are made for chatting,
    not for writing long reports.

    it's best to just go to the website: ${chatbot_config_1.WinkDiceConfig.PROD_REST_API_Endpoint}/bugs/new
    [--------------------]
    `);
            const FE = new chatbot_utils_1.FlagEngine("--", []);
            const flg = (name) => FE.getFlag(name, _.msg.args.join(" ")).value;
            if (flg("severity") == '' || flg("title") == '' || flg("desc") == '')
                return _.reply(`
        \`--severity\`, \`--title\` and/or \`--desc\` are not provided
        Please give me some arguments!
        Example: \`${__1.discConfig.prefix}report (--platform="<Platform>") --severity=<["minor"|"problematic"|"fatal"]> --title="<Some Title>" --desc="<Some Description>"\`

        Possible Platforms are: <${PossiblePlatforms.join(" | ")}>, Alternatively you can not include that flag and then the bot will assume the chat platform you are currently typing this on!
    `);
            const platform_ = flg("platform") == '' ? platform : flg("platform");
            if (!PossiblePlatforms.includes(platform_))
                return _.reply(`
      Invalid platform, valid platforms are: <${PossiblePlatforms.join(" | ")}>

    **\`(Source: this.command.invalidArgsPrompt)\`**
    \`\`\`ts
    /* QUOTE::START */
    Please give me some arguments!
    Example: \`${__1.discConfig.prefix}report (--platform="<Platform>") --severity=<["minor"|"problematic"|"fatal"]> --title="<Some Title>" --desc="<Some Description>"\`
    /* QUOTE::END */
    \`\`\`
    `);
            const report = {
                platform: platform_,
                user: msg.member.displayName,
                severity: flg("severity"),
                title: flg("title"),
                description: flg("desc")
            };
            console.log(report);
            yield (0, axios_1.default)({
                method: "POST",
                url: `${chatbot_config_1.WinkDiceConfig.PROD_REST_API_Endpoint}/api/bug/new`,
                data: { data: report },
            }).then((res) => {
                _.reply("Successfully send");
            });
        }),
    };
    exports.default = cmd;
});
//# sourceMappingURL=report.js.map
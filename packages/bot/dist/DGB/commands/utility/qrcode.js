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
        define(["require", "exports", "../../../CmdClient", "../../../stores/basic-stores", "@daydrm-studios/chatbot-config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CmdClient_1 = require("../../../CmdClient");
    const basic_stores_1 = require("../../../stores/basic-stores");
    const chatbot_config_1 = require("@daydrm-studios/chatbot-config");
    const store = basic_stores_1.basicStores;
    const cmd = {
        name: "qrcode",
        aliases: ["qr"],
        execute: (msg, args, cmd, platform, extra) => __awaiter(void 0, void 0, void 0, function* () {
            const { fw_, config, fnv, stateHolder } = extra;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            let Emb;
            msg.reply("Waiting for response...");
            if (platform === "discord")
                Emb = new _.Embed()
                    .setColor(0xffaa33)
                    .setTitle("Command Unsupported on discord...")
                    .setDescription("\nThis command makes use of an external asset that discord can't reach.\n\nIf you really need to use this function then head over to the guilded server (if you are not already in there then just run `" +
                    _.config.prefix +
                    "invite`");
            else
                Emb = new _.Embed()
                    .setColor(0xf0f0f0)
                    .setTitle("Your QR-Code")
                    .setDescription(`${args.slice(1).join(" ")}`)
                    .setImage(`${chatbot_config_1.WinkDiceConfig.PROD_REST_API_Endpoint}/api/gen/qrcode/${encodeURI(args.slice(1).join(" "))}`);
            msg.reply({
                embeds: [Emb],
            });
        }),
    };
    exports.default = cmd;
});
//# sourceMappingURL=qrcode.js.map
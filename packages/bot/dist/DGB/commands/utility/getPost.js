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
        define(["require", "exports", "../../../CmdClient", "../../../stores/basic-stores", "../..", "axios", "@daydrm-studios/chatbot-config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CmdClient_1 = require("../../../CmdClient");
    const basic_stores_1 = require("../../../stores/basic-stores");
    const __1 = require("../..");
    const axios_1 = __importDefault(require("axios"));
    const chatbot_config_1 = require("@daydrm-studios/chatbot-config");
    const store = basic_stores_1.basicStores;
    const cmd = {
        name: "getPost",
        aliases: ["getpost", "fetchpost", "fetchPost", "fpost", "gpost"],
        execute: (msg, args, cmd, platform, extra) => __awaiter(void 0, void 0, void 0, function* () {
            const { fw_, config, fnv, stateHolder } = extra;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            const mesg = _.msg.msg;
            msg.reply("Waiting for response...");
            yield (0, axios_1.default)({
                method: "POST",
                url: `${chatbot_config_1.WinkDiceConfig.PROD_REST_API_Endpoint}/api/posts/getSpec`,
                data: { data: { post: { id: args[1] } } },
            })
                .then((resp) => {
                const res = resp.data;
                const post = res.post;
                if (post == null) {
                    _.msg.msg.reply({
                        embeds: [
                            new _.Embed()
                                .setColor(0xffaa33)
                                .setTitle("Couldn't display post from website")
                                .setDescription("Was not able to find a post with the corresponding id! (id: " +
                                args[1] +
                                ")"),
                        ],
                    });
                }
                else if (post.content.length >= 1024) {
                    _.msg.msg.reply({
                        embeds: [
                            new _.Embed()
                                .setColor(0xaaaa33)
                                .setTitle("This post exceeds the character limit")
                                .setDescription(`[the post](${chatbot_config_1.WinkDiceConfig.PROD_REST_API_Endpoint}/post/${args[1]})`),
                        ],
                    });
                }
                else if (post.content.includes("<img") ||
                    post.content.includes("<iframe") ||
                    post.content.includes("<audio") ||
                    post.content.includes("<video")) {
                    _.msg.msg.reply({
                        embeds: [
                            new _.Embed()
                                .setColor(0xaaaa33)
                                .setTitle("This post contains media in a way that we cannot render!")
                                .setDescription(`[the post](${chatbot_config_1.WinkDiceConfig.PROD_REST_API_Endpoint}/post/${args[1]})`),
                        ],
                    });
                }
                else {
                    _.msg.msg.reply({
                        embeds: [
                            new _.Embed()
                                .setColor(0x1c71d8)
                                .setTitle(post.poster)
                                .setDescription(`[the post](${chatbot_config_1.WinkDiceConfig.PROD_REST_API_Endpoint}/post/${args[1]})`)
                                .addFields([
                                {
                                    name: post.title,
                                    value: __1.tdServ.turndown(post.content),
                                    inline: false,
                                },
                            ]),
                        ],
                    });
                }
            })
                .catch((e) => {
                _.msg.msg.reply({
                    embeds: [
                        new _.Embed()
                            .setColor(0xffaa33)
                            .setTitle("Something went wrong")
                            .setDescription("We just don't know what!\n" +
                            `[the post](${chatbot_config_1.WinkDiceConfig.PROD_REST_API_Endpoint}/post/${args[1]})`),
                    ],
                });
            });
        }),
    };
    exports.default = cmd;
});
//# sourceMappingURL=getPost.js.map
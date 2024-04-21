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
        define(["require", "exports", "../../../CmdClient", "../../../stores/basic-stores", "axios"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CmdClient_1 = require("../../../CmdClient");
    const basic_stores_1 = require("../../../stores/basic-stores");
    const axios_1 = __importDefault(require("axios"));
    const store = basic_stores_1.basicStores;
    let nsfwChannels = ["1095053394793738240", "d0474994-e11d-4b54-a28e-cd94e51c1f5f"];
    const cmd = {
        name: "reddit",
        aliases: ["r", "meme"],
        execute: (msg, args, cmd, platform, extra) => __awaiter(void 0, void 0, void 0, function* () {
            const { fw_, config, fnv, stateHolder } = extra;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            const mesg = _.msg.msg;
            nsfwChannels = yield fw_.database.get("channels.nsfw");
            msg.reply("Waiting for response...");
            yield axios_1.default.get(`https://www.reddit.com/r/${args[1]}/random/.json`).then((response) => {
                const [list] = response.data;
                const [post] = list.data.children;
                const permalink = post.data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = post.data.url;
                const memeTitle = post.data.title;
                const memeUpvotes = post.data.ups;
                const memeNumComments = post.data.num_comments;
                const nsfw = post.data.over_18;
                const channelId = platform == "discord" ? mesg.channel.id : mesg.channelId;
                let isGallery = memeImage.startsWith("https://www.reddit.com/gallery/");
                let Emb;
                if (nsfw && (!nsfwChannels.includes(channelId)))
                    Emb = new _.Embed()
                        .setColor(0xffaa33)
                        .setTitle("Couldn't display Reddit post")
                        .setDescription("this post was marked NSFW, but this channel is not for NSFW purposes!\nif you still want to see the post then go to `"
                        + permalink + "`");
                else
                    Emb = new _.Embed()
                        .setColor(0xFF5700)
                        .setTitle(memeTitle)
                        .setDescription(`👍 ${memeUpvotes} 💬 ${memeNumComments}${isGallery ? "\n\nThis post is an image gallery... and we are working on making that work but for now we can't display any image" : ""}`)
                        .setURL(memeUrl)
                        .setImage(memeImage);
                _.msg.msg.reply({
                    embeds: [Emb],
                });
            }).catch((e) => {
                _.msg.msg.reply({
                    embeds: [new _.Embed()
                            .setColor(0xffaa33)
                            .setTitle("Couldn't display Reddit post")
                            .setDescription("Was not able to find a post from the requested subreddit!"),
                    ],
                });
            });
        }),
    };
    exports.default = cmd;
});
//# sourceMappingURL=reddit.js.map
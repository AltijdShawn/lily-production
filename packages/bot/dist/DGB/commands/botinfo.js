(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../CmdClient", "@daydrm-studios/chatbot-utils", "../../stores/basic-stores", "..", "../../package"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CmdClient_1 = require("../../CmdClient");
    const chatbot_utils_1 = require("@daydrm-studios/chatbot-utils");
    const basic_stores_1 = require("../../stores/basic-stores");
    const __1 = require("..");
    const package_1 = require("../../package");
    const store = basic_stores_1.basicStores;
    const cmd = {
        name: "botinfo",
        aliases: ["info", "bi"],
        execute: (msg, args, cmd, platform, extra) => {
            const { fw_, config, fnv } = extra;
            const _ = (0, CmdClient_1.Cmd)({ msg, args, cmd }, platform);
            const client = _.msg.msg.client;
            const avatar = platform == "discord" ? client.user.avatarURL() : client.user.avatar;
            const Emb = new _.Embed()
                .setColor(0x9a3afa)
                .setTitle("Bot Info")
                .setThumbnail(avatar)
                .addFields([
                {
                    name: "Prefix",
                    value: `\`${__1.discConfig.prefix}\``,
                    inline: true,
                }, {
                    name: "Links",
                    value: `[Website](${config.PROD_REST_API_Endpoint})\n[Discord](${__1.discConfig.guilds.Discord})\n[Guilded](${__1.discConfig.guilds.Guilded})\n`,
                    inline: true,
                },
                {
                    name: "Bot Latency",
                    value: `${Date.now() - _.msg.msg.createdAt.getTime()}ms`,
                    inline: false,
                },
                { name: "API Latency", value: `${client.ws.ping}ms`, inline: true },
                {
                    name: "Uptime",
                    value: (0, chatbot_utils_1.secondsToString)(store.counters.get("uptime")),
                    inline: false,
                },
                {
                    name: "Versions",
                    value: `Node.js: \`${process.versions.node}\`\nGuilded.js: \`${package_1.pkg.dependencies["guilded.js"]}\`\nDiscord.js: \`${package_1.pkg.dependencies["discord.js"]}\``,
                    inline: false,
                },
            ]);
            _.msg.msg.reply({
                embeds: [Emb],
            });
        },
    };
    exports.default = cmd;
});
//# sourceMappingURL=botinfo.js.map
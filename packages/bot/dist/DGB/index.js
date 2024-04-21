var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        define(["require", "exports", "turndown", "@daydrm-studios/chatbot-config", "discord.js", "guilded.js", "../stores/basic-stores", "fs", "./utils/level"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tdServ = exports.DGB = exports.discConfig = void 0;
    const trndwn = __importStar(require("turndown"));
    const chatbot_config_1 = require("@daydrm-studios/chatbot-config");
    const discord_js_1 = require("discord.js");
    const guilded_js_1 = require("guilded.js");
    const basic_stores_1 = require("../stores/basic-stores");
    const fs_1 = require("fs");
    const level_1 = require("./utils/level");
    const store = basic_stores_1.basicStores;
    exports.discConfig = chatbot_config_1.chatbotsConfig.client;
    const DGB = (fw_, config, fnv) => loop(fw_, config, fnv);
    exports.DGB = DGB;
    function loop(fw_, config, fnv) {
        try {
            const { makeid, ToggleSpam, stateHolder } = fnv;
            const discord = new discord_js_1.Client({
                intents: [
                    discord_js_1.GatewayIntentBits.Guilds,
                    discord_js_1.GatewayIntentBits.GuildMembers,
                    discord_js_1.GatewayIntentBits.GuildMessages,
                    discord_js_1.GatewayIntentBits.GuildWebhooks,
                    discord_js_1.GatewayIntentBits.DirectMessages,
                    discord_js_1.GatewayIntentBits.MessageContent,
                ],
            });
            const guilded = new guilded_js_1.Client({ token: chatbot_config_1.chatbotsConfig.guilded_bot_token });
            guilded.on("ready", () => {
                console.log("guilded");
            });
            guilded.on("messageCreated", (msg) => __awaiter(this, void 0, void 0, function* () {
                const message = msg;
                const args = msg.content.split(" ");
                const cmd = args[0].replace(exports.discConfig.prefix, "");
                if (msg.authorId == guilded.user.botId)
                    return;
                if (msg.content == "")
                    return;
                yield (0, level_1.giveXP)(msg, "guilded");
                if (message.content.startsWith(exports.discConfig.prefix))
                    return yield cmdHandler(message, "guilded");
                else
                    return Disc2Guild();
                function Disc2Guild() {
                    var _a;
                    return __awaiter(this, void 0, void 0, function* () {
                        console.log("[GUILDED]" +
                            " (" +
                            msg.channelId +
                            ") " +
                            ((_a = msg.author) === null || _a === void 0 ? void 0 : _a.name) +
                            " > " +
                            msg.content);
                        const discordMessage = {
                            username: "",
                            content: "",
                            avatarURL: "",
                            channel: {},
                            allowed_mentions: ["roles", "users"],
                        };
                        let author = msg.author ||
                            (yield msg.client.users.cache.get(String(msg.authorId)));
                        if (!author)
                            return;
                        discordMessage.username = (author === null || author === void 0 ? void 0 : author.name) || "Guilded Bridge";
                        discordMessage.avatarURL = author === null || author === void 0 ? void 0 : author.avatar;
                        discordMessage.content =
                            msg.content == "" ? "{**EMPTY MESSAGE**}" : msg.content;
                        discordMessage.channel = msg.channel;
                        sendDiscordEmbed(yield msg.channelId, discordMessage);
                    });
                }
            }));
            discord.on("ready", () => {
                console.log("discord");
            });
            discord.on(discord_js_1.Events.MessageCreate, (msg) => __awaiter(this, void 0, void 0, function* () {
                let message = msg;
                const args = msg.content.split(" ");
                const cmd = args[0].replace(exports.discConfig.prefix, "");
                if (!message.guild || message.author.id == discord.user.id)
                    return;
                yield (0, level_1.giveXP)(msg, "discord");
                if (message.content.startsWith(exports.discConfig.prefix))
                    return yield cmdHandler(message, "discord");
                else
                    return Disc2Guild();
                function Disc2Guild() {
                    var _a;
                    return __awaiter(this, void 0, void 0, function* () {
                        console.log("[DISCORD]" +
                            " (" +
                            ((_a = msg.channel) === null || _a === void 0 ? void 0 : _a.name) +
                            ") " +
                            msg.author.username +
                            " > " +
                            msg.content);
                        const guildedMessage = {
                            username: "",
                            content: "",
                            channel: {},
                            avatarURL: "",
                            allowed_mentions: ["roles", "users"],
                        };
                        let author = msg.author;
                        if (author.username == discord.user.username)
                            return;
                        guildedMessage.avatarURL = author.avatarURL();
                        guildedMessage.username = author.username;
                        guildedMessage.content =
                            msg.content == "" ? "{**EMPTY MESSAGE**}" : msg.content;
                        guildedMessage.channel = msg.channel;
                        sendGuildedEmbed(yield msg.channelId, guildedMessage);
                    });
                }
            }));
            function sendDiscordEmbed(dChannel, message) {
                var _a;
                return __awaiter(this, void 0, void 0, function* () {
                    const ChannelMapIndex = (0, chatbot_config_1.findMap)("guilded", dChannel);
                    if (ChannelMapIndex === 0)
                        return;
                    console.log(ChannelMapIndex);
                    const target = chatbot_config_1.chatbotsConfig.channelmap[ChannelMapIndex].discord;
                    console.log(target);
                    const Emb = new discord_js_1.EmbedBuilder()
                        .setColor(0x131313)
                        .setThumbnail(message.avatarURL)
                        .setTitle(message.username + " < [" + ((_a = message.channel) === null || _a === void 0 ? void 0 : _a.name) + "]")
                        .setDescription(message.content)
                        .setFooter({
                        text: "CyBR - DGB [Guilded]",
                        iconUrl: "https://guilded.gg/asset/Icons/ms-icon-144x144.png?v=3",
                    });
                    (yield discord.channels.fetch(String(target))).send({
                        embeds: [Emb],
                    });
                });
            }
            function sendGuildedEmbed(gChannel, message) {
                var _a;
                return __awaiter(this, void 0, void 0, function* () {
                    const ChannelMapIndex = (0, chatbot_config_1.findMap)("discord", gChannel);
                    if (ChannelMapIndex === 0)
                        return;
                    console.log(ChannelMapIndex);
                    const target = chatbot_config_1.chatbotsConfig.channelmap[ChannelMapIndex].guilded;
                    console.log(target);
                    const Emb = new guilded_js_1.Embed()
                        .setColor(0x131313)
                        .setThumbnail(message.avatarURL)
                        .setTitle(message.username + " < [" + ((_a = message.channel) === null || _a === void 0 ? void 0 : _a.name) + "]")
                        .setDescription(message.content)
                        .setFooter("CyBR - DGB [Discord]", "https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico");
                    (yield guilded.channels.fetch(target))
                        .send({
                        embeds: [Emb],
                    })
                        .catch((e) => {
                        console.log(e);
                        return;
                    });
                });
            }
            discord.login(chatbot_config_1.chatbotsConfig.discord_bot_token);
            guilded.login();
            function cmdHandler(msg, platform) {
                return __awaiter(this, void 0, void 0, function* () {
                    const message = msg;
                    const args = msg.content.split(" ");
                    const cmd = args[0].replace(exports.discConfig.prefix, "");
                    const command = store.commands.get(cmd);
                    try {
                        command.execute(msg, args, cmd, platform, { fw_, config, fnv, stateHolder });
                    }
                    catch (e) {
                        message.reply("Something went wrong, please contact the developer if you really need this fixed quickly");
                        console.log(e);
                    }
                });
            }
        }
        catch (e) {
            console.log(e);
            fw_.reportIncident("error", e, {
                file: "src/DGB/index.ts",
                timestamp: Date.now()
            });
            loop(fw_, config, fnv);
        }
    }
    const command_folders = (0, fs_1.readdirSync)("src/DGB/commands");
    for (const folder of command_folders) {
        console.log(folder);
        if (folder.endsWith(".ts"))
            register(folder, "commands");
        else {
            const command_folders = (0, fs_1.readdirSync)("src/DGB/commands/" + folder);
            for (const folder2 of command_folders) {
                console.log(folder + "/" + folder2);
                if (folder2.endsWith(".ts"))
                    register(folder2, "commands/" + folder);
            }
        }
    }
    function register(file, path) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const fileName = file.split(".")[0];
            const command = (yield (_a = `./${path}/${fileName}`, __syncRequire ? Promise.resolve().then(() => __importStar(require(_a))) : new Promise((resolve_1, reject_1) => { require([_a], resolve_1, reject_1); }).then(__importStar))).default;
            console.log(`+ [Command handler] Attempting to load: ${file} (main cmd name: ${command.name})`);
            store.commands.set(command.name, command);
            for (const alias of command.aliases) {
                console.log(`   | [Command handler] Attempting to attach: alias cmd name '${alias}' to file '${file}' (main cmd name: ${command.name})`);
                store.commands.set(alias, command);
            }
        });
    }
    const trndwnServ = new trndwn.default({});
    trndwnServ.addRule('strikethrough', {
        filter: ['del', 's'],
        replacement: function (content) {
            return '~~' + content + '~~';
        }
    });
    trndwnServ.addRule('linebreak', {
        filter: ['br'],
        replacement: function (content) {
            return '\n' + content;
        }
    });
    trndwnServ.addRule('paragraph', {
        filter: 'p',
        replacement: function (content) {
            return '\n\n' + content + '\n\n';
        }
    });
    trndwnServ.addRule("anchor", {
        filter: function (node, options) {
            return (options.linkStyle === 'inlined' &&
                node.nodeName === 'A' &&
                node.getAttribute('href'));
        },
        replacement: function (content, node, options) {
            if (node.getAttribute("href").startsWith("/"))
                return `[${content}](${chatbot_config_1.WinkDiceConfig.PROD_REST_API_Endpoint}${node.getAttribute("href")})`;
            else
                return `[${content}](${node.getAttribute("href")})`;
        }
    });
    exports.tdServ = trndwnServ;
});
//# sourceMappingURL=index.js.map
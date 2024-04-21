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
        define(["require", "exports", "axios", "discord.js", "socket.io-client", "quickmongo", "./DGB/mongo_usermaps", "bullmq"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.v2 = exports.db = exports.queueNames = void 0;
    const axios_1 = __importDefault(require("axios"));
    const discord_js_1 = require("discord.js");
    const socket_io_client_1 = require("socket.io-client");
    const quickmongo_1 = require("quickmongo");
    const mongo_usermaps_1 = require("./DGB/mongo_usermaps");
    const bullmq_1 = require("bullmq");
    exports.queueNames = {
        msgCache: "DGB_Lily_MsgCache",
    };
    const connection = {
        host: "127.0.0.1",
        port: 6379,
    };
    const msgQueue = new bullmq_1.Queue(exports.queueNames.msgCache, { connection });
    let useMessageQueue = true;
    exports.db = new quickmongo_1.Database("mongodb://127.0.0.1:27017/testBot");
    db_connect()
        .then(() => console.info("Database connected"))
        .catch((err) => console.error(err));
    function db_connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.db.connect();
            (0, mongo_usermaps_1.init)();
        });
    }
    class v2 {
        constructor(config, cmds, events) {
            this.database = exports.db;
            this.commands = new discord_js_1.Collection();
            this.events = new discord_js_1.Collection();
            this.lastmsgid = 0;
            this.intproc = {
                val: 0,
                cache: [],
            };
            this.config = config;
            cmds.forEach((cmd) => this.commands.set(cmd.name, cmd));
            console.log(this.config);
            this.socket = (0, socket_io_client_1.io)(this.config.socketIOEndpoint, {
                reconnectionDelayMax: 10000,
            });
            this.socket.on("inviteBot", (data) => this.onBotInvite(data));
            this.socket.on("newMessageOnChannel", (data) => __awaiter(this, void 0, void 0, function* () {
                console.log(yield exports.db.get("channels"));
                try {
                    const arr = yield exports.db.get("channels");
                    if (!arr.includes(data.msg.chatId))
                        return;
                    this.onMessageCreate(data);
                }
                catch (e) {
                    void e;
                }
            }));
            this.onReady();
            let msgQueue_worker;
            if (useMessageQueue == false) {
                msgQueue_worker = setInterval(() => {
                    if (this.intproc.val == 0)
                        return;
                    else {
                        const ip = this.intproc;
                        this.cmdHandler(ip.cache[ip.cache.length - 1]);
                        ip.cache.pop();
                        ip.val--;
                        return (this.intproc = ip);
                    }
                }, 500);
            }
            else {
                msgQueue_worker = new bullmq_1.Worker(exports.queueNames.msgCache, (job) => __awaiter(this, void 0, void 0, function* () {
                    console.info(`[WS_Queue Job]: ${job.id}`, job.data);
                    this.cmdHandler(job.data);
                    return (this.intproc.val -= 1);
                }), { connection });
            }
        }
        addCache(stuff) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(stuff);
                if (useMessageQueue == false) {
                    this.intproc.cache.push(stuff);
                    this.intproc.val++;
                }
                else {
                    this.intproc.val++;
                    yield msgQueue.add(`msgQueue_msg_${this.intproc.val}`, stuff);
                }
            });
        }
        eventHandler(eventName, extra) {
            if (!this.events.has(eventName))
                return;
            const event = this.events.get(eventName);
            event.execute(eventName, extra, this);
        }
        cmdHandler(msg) {
            if (!this.commands.has(msg.content.split(" ")[0]))
                return;
            const cmd = this.commands.get(msg.content.split(" ")[0]);
            if (cmd.restrict.includes(msg.sendBy))
                return cmd.execute(msg, this);
            else if (cmd.restrict.includes("none"))
                cmd.execute(msg, this);
            else
                return;
        }
        sendMessage(data) {
            return __awaiter(this, void 0, void 0, function* () {
                yield (0, axios_1.default)({
                    method: "POST",
                    url: this.config.REST_API_Endpoint + "/api/chat/send",
                    data: {
                        data: {
                            authToken: this.config.token,
                            target: data.target,
                            sender: this.config.username,
                            content: data.content,
                        },
                    },
                }).then((resp) => console.log(resp.data));
            });
        }
        onMessageCreate(data) {
            let msg = data.msg;
            this.eventHandler("onMessageCreate", msg);
            if (String(msg.content).startsWith(this.config.prefix)) {
                if (msg.sender == this.config.username)
                    return;
                if (msg.id == this.lastmsgid)
                    return;
                msg.content = msg.content.replace(this.config.prefix, "");
                msg.cmd = msg.content.split(" ")[0];
                msg.args_meta = msg.content.split(" ");
                msg.args = msg.args_meta.slice(1, msg.args_meta.length);
                this.addCache(msg);
                console.log("[COMMAND]", data);
                return (this.lastmsgid = msg.id);
            }
        }
        onBotInvite(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(this);
                if (this.config.username == data.bot) {
                    yield exports.db.push("channels", data.chat.id);
                    this.sendMessage({
                        target: data.chat.name,
                        content: "Registered channel of name '" + data.chat.name + "'",
                    });
                }
            });
        }
        onReady() {
            this.sendWS({
                id: "sendAimedMesg",
                args: {
                    target: "global",
                    message: {
                        text: `${this.config.username}, started successfully`,
                        position: "top-right",
                        pauseOnHover: true,
                        pauseOnFocusLoss: true,
                    },
                },
            });
        }
        sendWS(data) {
            (0, axios_1.default)({
                method: "POST",
                url: this.config.REST_API_Endpoint + "/api/addWSCache",
                data: {
                    data: {
                        authToken: this.config.token,
                        wsIn: data,
                    },
                },
            }).then((resp) => {
                console.log(resp.data);
                return resp;
            });
        }
        reportIncident(level, message, data) {
            return __awaiter(this, void 0, void 0, function* () {
                setTimeout(() => {
                    var _a, _b, _c, _d, _e;
                    this.sendWS({
                        id: "incidentReport",
                        args: {
                            level,
                            message: String(message),
                            data: {
                                file: (_a = data.file) !== null && _a !== void 0 ? _a : "unknown",
                                userId: (_b = data.userId) !== null && _b !== void 0 ? _b : "<BOT-INSTANCE>::{" + this.config.username + "}",
                                sessionId: (_c = data.sessionId) !== null && _c !== void 0 ? _c : "<BOT-INSTANCE>::{" + this.config.username + "}",
                                socketId: (_d = data.socketId) !== null && _d !== void 0 ? _d : "unknown",
                                timestamp: (_e = data.timestamp) !== null && _e !== void 0 ? _e : Date.now(),
                            },
                        },
                    });
                }, 2000);
            });
        }
    }
    exports.v2 = v2;
});
//# sourceMappingURL=framework.js.map
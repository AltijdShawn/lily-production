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
        define(["require", "exports", "./framework", "./DGB", "@daydrm-studios/chatbot-config", "./stores/basic-stores"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const framework_1 = require("./framework");
    const DGB_1 = require("./DGB");
    const chatbot_config_1 = require("@daydrm-studios/chatbot-config");
    const basic_stores_1 = require("./stores/basic-stores");
    let stateHolder = {
        spam: false,
        spamExtraFunc: (state) => { },
        count: {
            Onesec: 0,
        },
    };
    const store = basic_stores_1.basicStores;
    store.counters.set("uptime", 0);
    function loop() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const config = chatbot_config_1.WinkDiceConfig;
                const cmds = [
                    {
                        name: "nothing",
                        restrict: ["none"],
                        execute: (msg, fw) => { },
                    },
                    {
                        name: "send",
                        restrict: ["xA_Emiloetjex"],
                        execute: (msg, fw) => {
                            fw.sendWS({
                                id: "sendAimedMesg",
                                args: {
                                    target: "global",
                                    message: {
                                        text: `${msg.args.join(" ")}`,
                                        position: "top-right",
                                        pauseOnHover: true,
                                        pauseOnFocusLoss: true,
                                    },
                                },
                            });
                        },
                    },
                    {
                        name: "overload",
                        restrict: ["xA_Emiloetjex"],
                        execute: (msg, fw) => {
                            ToggleSpam(msg, fw);
                        },
                    },
                    {
                        name: "popup",
                        restrict: ["xA_Emiloetjex"],
                        execute: (msg, fw) => {
                            fw.sendWS({
                                id: "modal",
                                args: {
                                    title: "",
                                    content: `<header style="color:var(--theme-fg)">${msg.args.join(" ")}</header>`,
                                    targets: ["global"],
                                },
                            });
                        },
                    },
                    {
                        name: "serverCMD",
                        restrict: ["xA_Emiloetjex"],
                        execute: (msg, fw) => {
                            fw.sendWS({
                                id: "notification_send",
                                args: {
                                    msg: `@${msg.args[0]} ${msg.args
                                        .slice(1, msg.args.length)
                                        .join(" ")}`,
                                    data: {
                                        authToken: config.token,
                                        target: "main",
                                        sender: config.username,
                                        content: msg.content,
                                        meta: {
                                            sessionId: "000000",
                                        },
                                    },
                                },
                            });
                        },
                    },
                ];
                const events = {
                    onMessageCreate: (ev, extra) => {
                        const { msg } = extra;
                    },
                };
                const fw_ = new framework_1.v2(config, cmds, events);
                (0, DGB_1.DGB)(fw_, config, {
                    makeid,
                    ToggleSpam,
                    stateHolder,
                });
                setInterval(() => {
                    if (stateHolder.spam == false)
                        return;
                    const arr = [
                        "top-left",
                        "top-center",
                        "top-right",
                        "bottom-left",
                        "bottom-center",
                        "bottom-right",
                    ];
                    const rand = Math.floor(Math.random() * arr.length);
                    const pos = arr[rand];
                    stateHolder.spamExtraFunc(stateHolder.spam);
                    fw_.sendWS({
                        id: "sendAimedMesg",
                        args: {
                            target: "global",
                            message: {
                                text: `<button>${makeid(Math.round(Math.random() * 64) + rand)}</button>`,
                                position: pos,
                                pauseOnHover: true,
                                pauseOnFocusLoss: true,
                            },
                        },
                    });
                }, 200);
                setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    store.counters.set("uptime", store.counters.get("uptime") + 1);
                }), 1000);
            }
            catch (e) {
                console.log(e);
                const config = chatbot_config_1.WinkDiceConfig;
                new framework_1.v2(config, [], []).reportIncident("error", e, {
                    file: "src/index.ts",
                    timestamp: Date.now()
                });
                loop();
            }
        });
    }
    loop();
    function makeid(length) {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    function ToggleSpam(msg, fw, extraFunc) {
        if (stateHolder.spam == false) {
            stateHolder.spam = true;
            extraFunc != undefined
                ? (stateHolder.spamExtraFunc = extraFunc)
                : (stateHolder.spamExtraFunc = (state) => { });
        }
        else if (stateHolder.spam == true) {
            stateHolder.spam = false;
            stateHolder.spamExtraFunc = (state) => { };
        }
        fw.sendMessage({
            target: msg.target,
            content: `Spam loop is set to ${stateHolder.spam}`,
        });
        return stateHolder;
    }
});
//# sourceMappingURL=index.js.map
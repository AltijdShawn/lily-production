(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "discord.js", "guilded.js", "../DGB"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cmd = void 0;
    const discord_js_1 = require("discord.js");
    const guilded_js_1 = require("guilded.js");
    const DGB_1 = require("../DGB");
    function Cmd(m, platform) {
        console.log("This also");
        const common = {
            reply: (content) => m.msg.reply(content),
            author: m.msg.author,
            channel: m.msg.channel,
            Embed: null,
            msg: m,
            config: DGB_1.discConfig,
            $def_TEST001: {
                $def_TEST001: "test001-str",
                $def_TEST002: "test002-str",
                $def_TEST003: "test003-str"
            }
        };
        const discord = Object.assign(Object.assign({}, common), { Embed: discord_js_1.EmbedBuilder });
        const guilded = Object.assign(Object.assign({}, common), { Embed: guilded_js_1.Embed });
        discord["$def_TEST001"]["$def_TEST004"] = "tiskort";
        guilded["$def_TEST001"]["$def_TEST004"] = "giltet";
        if (platform === "discord")
            return discord;
        else if (platform === "guilded")
            return guilded;
        else
            return common;
    }
    exports.Cmd = Cmd;
});
//# sourceMappingURL=index.js.map
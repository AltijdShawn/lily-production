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
        define(["require", "exports", "../mongo_usermaps"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.rewardIfGoalReached = exports.giveXP = void 0;
    const mongo_usermaps_1 = require("../mongo_usermaps");
    const server = undefined;
    const settings = server || {
        minXP: 1,
        maxXP: 15,
        pow: 100
    };
    function giveXP(msg, platform, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorId = (platform == "discord" ? msg.author.id : msg.authorId) || msg.author.id;
            const exists = yield (0, mongo_usermaps_1.getData)(platform, authorId);
            if (exists == null)
                return;
            const minXP = settings.minXP;
            const maxXP = settings.maxXP;
            let gain = amount !== undefined ? minXP + Math.floor(Math.random() * (1 + maxXP - minXP)) : amount;
            const xpToAdd = gain;
            yield (0, mongo_usermaps_1.setMap)(exists["prof_id"], "total_xp", Number(exists["total_xp"]) + xpToAdd);
            yield (0, mongo_usermaps_1.setMap)(exists["prof_id"], "level_xp", Number(exists["level_xp"]) + xpToAdd);
            yield rewardIfGoalReached(exists, msg);
        });
    }
    exports.giveXP = giveXP;
    function rewardIfGoalReached(user, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_ = yield (0, mongo_usermaps_1.getData)("prof_id", user["prof_id"]);
            const nxtLvl = settings.pow * (Math.pow(2, user["level"]) - 1);
            if (user_["level_xp"] >= nxtLvl) {
                let reset_value = 0;
                if (user_["level_xp"] > nxtLvl)
                    reset_value = Number(user["level_xp"]) - nxtLvl;
                yield (0, mongo_usermaps_1.setMap)(user["prof_id"], "level_xp", reset_value);
                yield (0, mongo_usermaps_1.setMap)(user["prof_id"], "level", Number(user["level"]) + 1);
                const user__ = yield (0, mongo_usermaps_1.getData)("prof_id", user["prof_id"]);
                const nxtLvl_ = settings.pow * (Math.pow(2, user__["level"]) - 1);
                msg.reply(`**Congratulations!**\nYou have reached level \`${user__["level"]}\`, your total XP is \`${user__["total_xp"]}\`, XP progress for the next level: \`${user__["level_xp"]}/${nxtLvl_}\`!`);
            }
            else
                return;
        });
    }
    exports.rewardIfGoalReached = rewardIfGoalReached;
});
//# sourceMappingURL=level.js.map
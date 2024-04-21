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
        define(["require", "exports", "../framework", "@daydrm-studios/chatbot-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findMap = exports.setMap = exports.deleteData = exports.setData = exports.getData = exports.init = void 0;
    const framework_1 = require("../framework");
    const chatbot_utils_1 = require("@daydrm-studios/chatbot-utils");
    const table = () => __awaiter(void 0, void 0, void 0, function* () { return yield framework_1.db.get("profiles"); });
    function init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield framework_1.db.has("profiles")))
                yield framework_1.db.set("profiles", [
                    { prof_id: "", discord: "", guilded: "", total_xp: 0, level_xp: 0, level: 0, description: "" },
                ]);
        });
    }
    exports.init = init;
    function getData(platform, platId) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield findMap(platform, platId);
            console.log("Map:", map);
            if (map == 0)
                return null;
            else {
                const mapObj = (yield table())[map];
                return mapObj;
            }
        });
    }
    exports.getData = getData;
    function setData(profileID, object) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield findMap("prof_id", profileID);
            yield framework_1.db.push("profiles", object);
            return true;
        });
    }
    exports.setData = setData;
    function deleteData(profileID) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield findMap("prof_id", profileID);
            if (map == 0)
                return null;
            const mapObj = (yield table())[map];
            if (map != 0)
                yield framework_1.db.set("profiles", (0, chatbot_utils_1.removeFromArray)((yield table()), mapObj));
            return true;
        });
    }
    exports.deleteData = deleteData;
    function setMap(profileID, platform, platformID) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield findMap("prof_id", profileID);
            if (map == 0)
                return null;
            const mapObj = (yield table())[map];
            if (map != 0)
                yield framework_1.db.set("profiles", (0, chatbot_utils_1.removeFromArray)((yield table()), mapObj));
            mapObj[platform] = platformID;
            yield framework_1.db.push("profiles", mapObj);
            return true;
        });
    }
    exports.setMap = setMap;
    function findMap(client, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let Target = 0;
            (yield table()).forEach((item, index) => {
                if (item[client] == id)
                    return (Target = index);
                else
                    return;
            });
            return Target;
        });
    }
    exports.findMap = findMap;
});
//# sourceMappingURL=mongo_usermaps.js.map
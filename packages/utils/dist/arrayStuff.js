(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFromArray = exports.removeFromArray = void 0;
    function removeFromArray(Arr, Str) {
        let WorkFlow;
        WorkFlow = Arr.join(",");
        WorkFlow = WorkFlow.replace("," + Str, "");
        WorkFlow = WorkFlow.split(",");
        return WorkFlow;
    }
    exports.removeFromArray = removeFromArray;
    function getFromArray(Arr, ID) {
        let temp_1;
        Arr.forEach((item, index) => {
            item.index = index;
            if (item.ID == ID)
                return temp_1 = item;
            else
                return;
        });
        return temp_1;
    }
    exports.getFromArray = getFromArray;
});
//# sourceMappingURL=arrayStuff.js.map
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
    exports.FlagEngine = exports.parseArgsStringToArgv = void 0;
    function parseArgsStringToArgv(value, env, file) {
        // ([^\s'"]([^\s'"]*(['"])([^\3]*?)\3)+[^\s'"]*) Matches nested quotes until the first space outside of quotes
        // [^\s'"]+ or Match if not a space ' or "
        // (['"])([^\5]*?)\5 or Match "quoted text" without quotes
        // `\3` and `\5` are a backreference to the quote style (' or ") captured
        const myRegexp = /([^\s'"]([^\s'"]*(['"])([^\3]*?)\3)+[^\s'"]*)|[^\s'"]+|(['"])([^\5]*?)\5/gi;
        const myString = value;
        const myArray = [];
        if (env) {
            myArray.push(env);
        }
        if (file) {
            myArray.push(file);
        }
        let match;
        do {
            // Each call to exec returns the next regex match as an array
            match = myRegexp.exec(myString);
            if (match !== null) {
                // Index 1 in the array is the captured group if it exists
                // Index 0 is the matched text, which we use if no captured group exists
                myArray.push(firstString(match[1], match[6], match[0]));
            }
        } while (match !== null);
        return myArray;
    }
    exports.default = parseArgsStringToArgv;
    exports.parseArgsStringToArgv = parseArgsStringToArgv;
    // Accepts any number of arguments, and returns the first one that is a string
    // (even an empty string)
    function firstString(...args) {
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (typeof arg === "string") {
                return arg;
            }
        }
    }
    const stringArgv = parseArgsStringToArgv;
    class FlagEngine {
        constructor(flagPrefix, passedFlags) {
            this.flags = [];
            this.prefix = "";
            this.lastParsed = "";
            this.prefix = flagPrefix;
            this.flags = passedFlags;
        }
        parse(msg) {
            const argv = stringArgv(msg, 'node', 'ebolean');
            const parsed = [];
            argv.forEach((flag, index) => {
                if (flag.startsWith(this.prefix))
                    return parsed.push(flag.replace(this.prefix, ''));
                else
                    return;
            });
            return parsed;
        }
        getFlag(flagName, msg) {
            const parsed = this.parse(msg);
            let flag;
            parsed.forEach((flag) => {
                const flg = flag.split("=");
                flg[1] = JSON.parse(flg[1]);
                if (flg[0] == flagName) {
                    //console.log(flg, flg[0], "==", flagName, (flg[0] == flagName), flg[1])
                    this.lastParsed = flg[1];
                    // console.log(this.lastParsed)
                }
                else
                    return flag = "NONE";
            });
            return { parsed, value: this.lastParsed };
        }
    }
    exports.FlagEngine = FlagEngine;
});
//# sourceMappingURL=FlagEngine.js.map
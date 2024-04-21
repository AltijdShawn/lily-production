export { parseArgsStringToArgv };
export default function parseArgsStringToArgv(value: string, env?: string, file?: string): string[];
export declare class FlagEngine {
    flags: string[];
    prefix: string;
    lastParsed: string;
    constructor(flagPrefix: string, passedFlags: string[]);
    parse(msg: string): any[];
    getFlag(flagName: string, msg: string): {
        parsed: any[];
        value: string;
    };
}
//# sourceMappingURL=FlagEngine.d.ts.map
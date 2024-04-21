/// <reference types="turndown" />
import { GatewayIntentBits } from "discord.js";
export declare const discConfig: {
    clientId: string;
    privilegedUsers: string[];
    prefix: string;
    intents: GatewayIntentBits[];
    guilds: {
        Discord: string;
        Guilded: string;
    };
};
export declare const DGB: (fw_: any, config: any, fnv: any) => void;
export declare const tdServ: import("turndown");
//# sourceMappingURL=index.d.ts.map
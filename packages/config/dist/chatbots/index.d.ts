export declare const chatbotsConfig: {
    channelmap: {
        discord: string;
        guilded: string;
    }[];
    guilded_bot_token: string;
    discord_bot_token: string;
    prefix: string;
    client: {
        clientId: string;
        privilegedUsers: string[];
        prefix: string;
        intents: import("discord.js").GatewayIntentBits[];
        guilds: {
            Discord: string;
            Guilded: string;
        };
    };
};
export declare function findMap(client: any, id: any): number;
//# sourceMappingURL=index.d.ts.map
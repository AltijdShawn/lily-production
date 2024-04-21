import { Message as dMessage, EmbedBuilder as dEmbed, User as dUser, Channel as dChannel } from "discord.js";
import { Message as gMessage, Embed as gEmbed, User as gUser, Channel as gChannel } from "guilded.js";
import { discConfig } from "../DGB";
export declare function Cmd(m: msgObj, platform?: pltfrm): cmdRet;
interface cmdRet {
    reply: (content: string) => Promise<gMessage> | Promise<dMessage<true>> | Promise<dMessage<false>>;
    author: dUser | gUser;
    channel: dChannel | gChannel;
    Embed: typeof dEmbed | typeof gEmbed | null;
    msg: msgObj;
    config: typeof discConfig;
    uwuntu: {
        [key: string | number | symbol]: any;
    };
}
interface msgObj {
    msg: dMessage<false> | dMessage<true> | gMessage;
    args: string[];
    cmd: string;
}
type pltfrm = "guilded" | "discord" | "" | undefined | null;
export {};
//# sourceMappingURL=index.d.ts.map
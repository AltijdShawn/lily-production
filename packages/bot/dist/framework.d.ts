import { Collection } from "discord.js";
import { Database } from "quickmongo";
export declare const queueNames: {
    msgCache: string;
};
export declare const db: Database<unknown, unknown>;
export declare class v2 {
    database: Database<unknown, unknown>;
    socket: any;
    commands: Collection<unknown, unknown>;
    events: Collection<unknown, unknown>;
    config: config_;
    private lastmsgid;
    private intproc;
    constructor(config: config_, cmds: Command[], events: any);
    addCache(stuff: any): Promise<void>;
    eventHandler(eventName: string, extra: any): void;
    cmdHandler(msg: any): any;
    sendMessage(data: any): Promise<void>;
    onMessageCreate(data: any): any;
    onBotInvite(data: any): Promise<void>;
    onReady(): void;
    sendWS(data: any): void;
    reportIncident(level: any, message: any, data: IncidentReportData): Promise<void>;
}
interface IncidentReportData {
    file?: string;
    userId?: string;
    sessionId?: string;
    socketId?: string;
    timestamp?: number;
}
export declare type v2_T = typeof v2 & v2;
export interface config_ {
    username: string;
    token: string;
    assignedDMS?: string[];
    prefix: string;
    socketIOEndpoint: string;
    REST_API_Endpoint: string;
}
export interface Command {
    name: string;
    restrict: string[];
    execute: (msg: any, fw: v2_T) => any | void;
}
export interface Message {
    chatId: number;
    sendBy: string;
    target: string | null;
    content: string;
    cmd: string;
    args_meta: string[];
    args: string[];
}
export {};
//# sourceMappingURL=framework.d.ts.map
import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ChannelInfo {
    bio: string;
    channelUrl: string;
    channelName: string;
}
export interface backendInterface {
    getBio(): Promise<string>;
    getChannelInfo(): Promise<ChannelInfo>;
    getChannelName(): Promise<string>;
    getChannelUrl(): Promise<string>;
}

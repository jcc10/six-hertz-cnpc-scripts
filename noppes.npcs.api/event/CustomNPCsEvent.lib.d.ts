/// <reference no-default-lib="true"/>
/// <reference path="../forge_stuff/fml.common.eventhandler.Event.lib.d.ts" />
/// <reference path="../NpcAPI.lib.d.ts" />

declare interface CustomNPCsEvent extends ForgeEvent {
    readonly API: NpcAPI
}
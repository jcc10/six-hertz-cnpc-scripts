/// <reference no-default-lib="true"/>
/// <reference path="../CustomNPCsEvent.lib.d.ts" />
/// <reference path="../../container/Container.lib.d.ts" />
/// <reference path="../../entity/Player.lib.d.ts" />

declare interface CustomContainerEvent extends CustomNPCsEvent {
    container: Container,
    player: Player
}
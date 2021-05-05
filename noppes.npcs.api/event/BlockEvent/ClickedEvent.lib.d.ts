/// <reference no-default-lib="true"/>
/// <reference path="./BlockEvent.lib.d.ts" />
/// <reference path="../../entity/Player.lib.d.ts" />

declare interface ClickedEvent extends BlockEvent {
    player: Player
}
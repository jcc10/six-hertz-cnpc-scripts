/// <reference no-default-lib="true"/>
/// <reference path="./BlockEvent.lib.d.ts" />
/// <reference path="../../entity/Player.lib.d.ts" />
/// <reference path="../../constants/SideEnum.lib.d.ts" />

interface InteractEvent extends BlockEvent {
    hitX: number,
    hitY: number,
    hitZ: number,
    player: Player,
    side: SideEnum
}
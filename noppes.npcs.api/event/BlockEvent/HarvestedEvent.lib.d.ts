/// <reference no-default-lib="true"/>
/// <reference path="./BlockEvent.lib.d.ts" />
/// <reference path="../../entity/Player.lib.d.ts" />

interface HarvestedEvent extends BlockEvent {
    player: Player
}
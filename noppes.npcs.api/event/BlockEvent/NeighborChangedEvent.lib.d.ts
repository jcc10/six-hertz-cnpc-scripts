/// <reference no-default-lib="true"/>
/// <reference path="./BlockEvent.lib.d.ts" />
/// <reference path="../../Pos.lib.d.ts" />

declare interface NeighborChangedEvent extends BlockEvent {
    changedPos: Pos
}
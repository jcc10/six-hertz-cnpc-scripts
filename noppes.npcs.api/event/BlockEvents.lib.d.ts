/// <reference no-default-lib="true"/>
/// <reference lib="es2015"/>
/// <reference path="./CustomNPCsEvent.lib.d.ts" />
/// <reference path="../block/Block.lib.d.ts" />
/// <reference path="../entity/Player.lib.d.ts" />
/// <reference path="../entity/Entity.lib.d.ts" />
/// <reference path="../constants/SideEnum.lib.d.ts" />
/// <reference path="../Pos.lib.d.ts" />

declare interface BlockEvent extends CustomNPCsEvent {
    block: Block,
}

//deno-lint-ignore no-empty-interface
declare interface BreakEvent extends BlockEvent {}

declare interface ClickedEvent extends BlockEvent {
    player: Player
}

declare interface CollidedEvent extends BlockEvent {
    entity: Entity
}

//deno-lint-ignore no-empty-interface
declare interface DoorToggleEvent extends BlockEvent {}

declare interface EntityFallenUponEvent extends BlockEvent {
    distanceFallen: number,
    entity: Entity
}

//deno-lint-ignore no-empty-interface
declare interface ExplodedEvent extends BlockEvent {}

declare interface HarvestedEvent extends BlockEvent {
    player: Player
}

//deno-lint-ignore no-empty-interface
declare interface InitEvent extends BlockEvent {}

declare interface InteractEvent extends BlockEvent {
    hitX: number,
    hitY: number,
    hitZ: number,
    player: Player,
    side: SideEnum
}

declare interface NeighborChangedEvent extends BlockEvent {
    changedPos: Pos
}

//deno-lint-ignore no-empty-interface
declare interface RainFillEvent extends BlockEvent {}

declare interface RedstoneEvent extends BlockEvent {
    power: number,
    prevPower: number,
}

declare interface TimerEvent extends BlockEvent {
    id: number
}

//deno-lint-ignore no-empty-interface
declare interface UpdateEvent extends BlockEvent {}
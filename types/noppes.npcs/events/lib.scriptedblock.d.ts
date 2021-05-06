/// <reference no-default-lib="true"/>
/// <reference path="./lib.CustomNPCsEvent.d.ts" />
declare interface BlockEvent extends CustomNPCsEvent {
    block: IBlock,
}

//deno-lint-ignore no-empty-interface
declare interface BreakEvent extends BlockEvent {}

declare interface ClickedEvent extends BlockEvent {
    player: IPlayer
}

declare interface CollidedEvent extends BlockEvent {
    entity: IEntity
}

//deno-lint-ignore no-empty-interface
declare interface DoorToggleEvent extends BlockEvent {}

declare interface EntityFallenUponEvent extends BlockEvent {
    distanceFallen: number,
    entity: IEntity
}

//deno-lint-ignore no-empty-interface
declare interface ExplodedEvent extends BlockEvent {}

declare interface HarvestedEvent extends BlockEvent {
    player: IPlayer
}

//deno-lint-ignore no-empty-interface
declare interface InitEvent extends BlockEvent {}

declare interface InteractEvent extends BlockEvent {
    hitX: number,
    hitY: number,
    hitZ: number,
    player: IPlayer,
    side: SideType
}

declare interface NeighborChangedEvent extends BlockEvent {
    changedPos: IPos
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


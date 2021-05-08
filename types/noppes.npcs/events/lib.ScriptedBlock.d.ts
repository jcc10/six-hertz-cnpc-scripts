/// <reference no-default-lib="true"/>
/// <reference path="./lib.CustomNPCsEvent.d.ts" />
declare interface CustomGuiEvent extends CustomNPCsEvent {
    gui: ICustomGui
    player: IPlayer
}

declare interface ButtonEvent extends CustomGuiEvent {
    buttonId: number
}

//deno-lint-ignore no-empty-interface
declare interface CloseEvent extends CustomGuiEvent {}

declare interface ScrollEvent extends CustomGuiEvent {
    doubleClick: boolean
    scrollId: number
    scrollIndex: number
    selection: string[]
}

declare interface SlotEvent extends CustomGuiEvent {
    slotId: number
    stack: IItemStack
}
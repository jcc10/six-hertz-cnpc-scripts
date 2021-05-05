/// <reference no-default-lib="true"/>
/// <reference path="./CustomGuiEvent.lib.d.ts" />
/// <reference path="../../item/ItemStack.lib.d.ts" />

declare interface SlotEvent extends CustomGuiEvent {
    slotId: number,
    stack: ItemStack
}
/// <reference no-default-lib="true"/>
/// <reference path="./CustomGuiEvent.lib.d.ts" />
/// <reference path="../../item/ItemStack.lib.d.ts" />

interface SlotEvent extends BlockEvent {
    slotId: number,
    stack: ItemStack
}
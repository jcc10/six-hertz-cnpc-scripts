/// <reference no-default-lib="true"/>
/// <reference path="./CustomContainerEvent.lib.d.ts" />
/// <reference path="../../item/ItemStack.lib.d.ts" />

interface SlotClickedEvent extends CustomContainerEvent {
    heldItem: ItemStack,
    slot: number,
    slotItem: ItemStack,
}
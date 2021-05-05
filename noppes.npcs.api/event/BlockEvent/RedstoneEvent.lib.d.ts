/// <reference no-default-lib="true"/>
/// <reference path="./BlockEvent.lib.d.ts" />

interface RedstoneEvent extends BlockEvent {
    power: number,
    prevPower: number,
}
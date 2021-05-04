/// <reference no-default-lib="true"/>
/// <reference path="./BlockEvent.lib.d.ts" />

interface BreakEvent extends BlockEvent {
    power: number,
    prevPower: number,
}
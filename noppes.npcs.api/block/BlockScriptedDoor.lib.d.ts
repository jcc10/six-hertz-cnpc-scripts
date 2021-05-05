/// <reference no-default-lib="true"/>
/// <reference path="./Block.lib.d.ts"/>
/// <reference path="../Timers.lib.d.ts"/>

declare interface BlockScriptedDoor extends Block {
    getBlockModel(): string
    getHardness(): number
    getOpen(): boolean
    getResistance(): number
    getTimers(): Timers
    setBlockModel(name: string): void
    setHardness(hardness: number): void
    setOpen(open: boolean): void
    setResistance(resistance: number): void
}
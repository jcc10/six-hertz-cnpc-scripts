/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/lib.api.d.ts"/>

export function msToTicks(ms: number): number {
    return (ms / 1000) * 20;
}
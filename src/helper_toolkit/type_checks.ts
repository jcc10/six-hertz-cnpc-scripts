/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/lib.api.d.ts" />

export function instanceofBlockScripted(block: IBlock): block is IBlockScripted {
    return "getIsLadder" in block;
}
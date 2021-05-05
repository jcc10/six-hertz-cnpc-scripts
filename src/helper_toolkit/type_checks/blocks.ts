/// <reference no-default-lib="true"/>
/// <reference path="../../../noppes.npcs.api/block/Block.lib.d.ts" />
/// <reference path="../../../noppes.npcs.api/block/BlockScripted.lib.d.ts" />

export function instanceofBlockScripted(block: Block): block is BlockScripted {
    return "getIsLadder" in block;
}
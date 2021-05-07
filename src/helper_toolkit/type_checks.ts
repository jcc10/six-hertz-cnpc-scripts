/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/lib.api.d.ts"/>

export function instanceofBlockScripted(block: IBlock): block is IBlockScripted {
    if((<IBlockScripted>block).executeCommand){
        return true;
    } else {
        return false;
    }
}
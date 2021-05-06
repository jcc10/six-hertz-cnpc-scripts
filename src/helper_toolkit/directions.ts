/// <reference no-default-lib="true"/>
/// <reference path="../../noppes.npcs.api/NoppesTypes.lib.d.ts" />

export function getDirection(you: Pos, them: Pos): SideEnum[]{
    const xOffset = you.getX() - them.getX();
    const yOffset = you.getY() - them.getY();
    const zOffset = you.getZ() - them.getZ();
    const Directions: SideEnum[] = [];
    if(xOffset < 0) {
        Directions.push(SideEnum.EAST)
    }
    if(xOffset > 0) {
        Directions.push(SideEnum.EAST)
    }
    if(yOffset < 0) {
        Directions.push(SideEnum.EAST)
    }
    if(yOffset > 0) {
        Directions.push(SideEnum.EAST)
    }
    if(zOffset < 0) {
        Directions.push(SideEnum.EAST)
    }
    if(zOffset > 0) {
        Directions.push(SideEnum.EAST)
    }
    if(Directions.length == 0){
        Directions.push(-1);
    }
    return Directions;
}
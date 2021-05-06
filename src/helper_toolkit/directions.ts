/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/lib.api.d.ts"/>

export enum SideEnum {
    DOWN = 0,
    UP,
    NORTH,
    SOUTH,
    WEST,
    EAST,
}

export function SideTypeToEnum(side: SideType | SideEnum): SideEnum{
    return side as SideEnum;
}
export function SideEnumToType(side: SideType | SideEnum): SideType{
    return side as SideType;
}

export function getDirection(you: IPos, them: IPos): SideEnum[]{
    const xOffset = you.getX() - them.getX();
    const yOffset = you.getY() - them.getY();
    const zOffset = you.getZ() - them.getZ();
    const Directions: SideEnum[] = [];
    if(xOffset < 0) {
        Directions.push(SideEnum.EAST)
    }
    if(xOffset > 0) {
        Directions.push(SideEnum.WEST)
    }
    if(yOffset < 0) {
        Directions.push(SideEnum.UP)
    }
    if(yOffset > 0) {
        Directions.push(SideEnum.DOWN)
    }
    if(zOffset < 0) {
        Directions.push(SideEnum.SOUTH)
    }
    if(zOffset > 0) {
        Directions.push(SideEnum.NORTH)
    }
    if(Directions.length == 0){
        Directions.push(-1);
    }
    return Directions;
}
/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/events/lib.scriptedblock.d.ts"/>
import { Console } from "../helper_toolkit/console.ts";
import { getDirection, SideTypeToEnum, SideEnum } from "../helper_toolkit/directions.ts";

var console: Console;
const regenSideNext: Record<string, boolean> = {};

export function init(e: InitEvent): void {
	console = new Console(e.block.getWorld(), e.API);
	for(const n in SideEnum) {
		regenSideNext[n + ""] = false;
	}
}

//Test
//When block next to it mines
export function interact(e: InteractEvent): void {
	const side = e.side;
	regenSideNext[side] = !regenSideNext[side];
	console.log(`${SideEnum[SideTypeToEnum(side)]} reporting ${regenSideNext[side] ? "enabled" : "disabled"}`);
}

//Test
//When block next to it mines
export function neighborChanged(e: NeighborChangedEvent): void {
	const thisPos = e.block.getPos();
	const thatPos = e.changedPos
	const diff = getDirection(thisPos, thatPos);
	if(regenSideNext[diff[0]]){
        const world = e.block.getWorld();
        const thatBlock = world.getBlock(thatPos.getX(), thatPos.getY(), thatPos.getZ());
        console.log(`That block is '${thatBlock.getName()}' and has metadata '${thatBlock.getMetadata()}'`);
	}
	
}
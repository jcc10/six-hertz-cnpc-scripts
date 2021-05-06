/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/events/lib.scriptedblock.d.ts"/>
import { Console } from "../helper_toolkit/console.ts";
import { getDirection, SideTypeToEnum, SideEnum } from "../helper_toolkit/directions.ts";

var console: Console;

export function init(e: InitEvent): void {
	console = new Console(e.block.getWorld(), e.API);
}

//Test
//When block next to it mines
export function interact(e: InteractEvent): void {
	console.log(`Block click side reported as ${SideEnum[SideTypeToEnum(e.side)]}`);
}

//Test
//When block next to it mines
export function neighborChanged(e: NeighborChangedEvent): void {
	const thisPos = e.block.getPos();
	const thatPos = e.changedPos
	const diff = getDirection(thisPos, thatPos);
	console.log(`Block Update reported as ${SideEnum[diff[0]]}`);
}
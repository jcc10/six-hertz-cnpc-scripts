/// <reference no-default-lib="true"/>
/// <reference path="../../noppes.npcs.api/NoppesTypes.lib.d.ts"/>
/// <reference path="../../noppes.npcs.api/java_stuff/java.lang.Object.lib.d.ts"/>
/// <reference path="../../noppes.npcs.api/event/BlockEvents.lib.d.ts"/>
import { Console } from "../helper_toolkit/console.ts";
import { getDirection } from "../helper_toolkit/directions.ts";

var console: Console;

export function init(e: InitEvent): void {
	console = new Console(e.block.getWorld(), e.API.Instance());
}

//Test
//When block next to it mines
export function neighborChanged(e: NeighborChangedEvent): void {
	const now = new Date().getTime();
	const thisPos = e.block.getPos();
	const thatPos = e.changedPos
	const diff = getDirection(thisPos, thatPos);
	console.log(`Block Update reported as ${SideEnum[diff[0]]}`);
}
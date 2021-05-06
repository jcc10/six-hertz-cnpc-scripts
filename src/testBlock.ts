/// <reference no-default-lib="true"/>
/// <reference path="../types/noppes.npcs/events/lib.scriptedblock.d.ts"/>
import { instanceofBlockScripted } from "./helper_toolkit/type_checks.ts";

export function init(e: InitEvent) {
	if(instanceofBlockScripted(e.block)){
		//Infinite Hardness
		e.block.setHardness(-10);
	}
}

function preventBreak(e: BlockEvent){
	// prevent breaking
	e.setCanceled(true);
}

export function broken(e: BreakEvent) {
	preventBreak(e)
}
export function exploded(e: ExplodedEvent) {
	preventBreak(e)
}
export function harvested(e: HarvestedEvent) {
	preventBreak(e)
	e.player.message("Test")
}

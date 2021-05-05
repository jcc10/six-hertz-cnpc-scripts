/// <reference no-default-lib="true"/>
/// <reference path="../../noppes.npcs.api/event/lib.BlockEvents.d.ts"/>
import { instanceofBlockScripted } from "../helper_toolkit/type_checks/blocks.ts";

//deno-lint-ignore no-unused-vars
function init(e: InitEvent) {
	if(instanceofBlockScripted(e.block)){
		//Infinite Hardness
		e.block.setHardness(-10);
	}
}


//deno-lint-ignore no-unused-vars
function broken(e: InitEvent) {
	// prevent breaking
	e.setCanceled(true);
}
//deno-lint-ignore no-unused-vars
function exploded(e: InitEvent) {
	// prevent breaking
	e.setCanceled(true);
}
//deno-lint-ignore no-unused-vars
function harvested(e: InitEvent) {
	// prevent breaking
	e.setCanceled(true);
}

/// <reference no-default-lib="true"/>
import {} from "../../noppes.npcs.api/event/lib.BlockEvents.d.ts"
import { instanceofBlockScripted } from "../helper_toolkit/type_checks/blocks.ts";

//deno-lint-ignore no-unused-vars
function init(e: InitEvent) {
	//updateBlockData(e.block)
	if(instanceofBlockScripted(e.block)){
		//Infinite Hardness
		e.block.setHardness(-10);
	}
}
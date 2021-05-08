/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/events/lib.ScriptedBlock.d.ts"/>
import { Console } from "../helper_toolkit/console.ts";
import { getDirection, SideTypeToEnum, SideEnum, getOffset } from "../helper_toolkit/directions.ts";
import { instanceofBlockScripted } from "../helper_toolkit/type_checks.ts";
import { msToTicks } from "../helper_toolkit/timer.ts";

var console: Console;

const regenTime = 5000;

const regenSideNext: Record<string, number> = {};
const shortcutSide: Record<string, boolean> = {};

export function init(e: InitEvent): void {
	console = new Console(e.block.getWorld(), e.API);
	if(!instanceofBlockScripted(e.block)){
		console.log("Wrong block type!");
		return;
	}
	e.block.getTimers().clear();
	for(const n in SideEnum) {
		regenSideNext[n + ""] = -1;
	}
	for(const n in SideEnum) {
		shortcutSide[n + ""] = false;
	}
}

export function interact(e: InteractEvent): void {
	const side = e.side;
	regenSideNext[side] = regenSideNext[side] == -1 ? 1 : -1;
	console.log(`Side ${SideEnum[SideTypeToEnum(side)]} is ${regenSideNext[side] == -1 ? "disabled" : "enabled"}`);
}

export function neighborChanged(e: NeighborChangedEvent): void {
	if(!instanceofBlockScripted(e.block)){
		console.log("Wrong block type!");
		return;
	}
	console.log("Update Detected!");
	const thisPos = e.block.getPos();
	const thatPos = e.changedPos
	const [side] = getDirection(thisPos, thatPos);
	if(shortcutSide[side]){
		shortcutSide[side] = false;
		return;
	}
	if(regenSideNext[side] >= 0){
		const world = e.block.getWorld();
		console.log("Update Accepted!");
		const timers = e.block.getTimers();
		console.log(timers.has(side) ? "Timer exists" : "Timer missing")
		if(!timers.has(side)){
			const now = Date.now()
			regenSideNext[side] = now + regenTime;
			if(!timerOrBlock(side, e.block)){
				shortcutSide[side] = true;
				world.setBlock(thatPos.getX(), thatPos.getY(), thatPos.getZ(), "variedcommodities:placeholder", 3);
			}
		}
	}
}

function timerOrBlock(side: SideEnum, block: IBlockScripted): boolean{
	const now = Date.now()
	// We time for half the amount of ticks remaining, this means we only really cause lag right around when the block should respawn.
	const remaining = msToTicks( regenSideNext[side] - now ) / 2;
	if(remaining > 0){
		const timers = block.getTimers();
		timers.start(side, remaining, false);
		console.log(`Timer now set for ${remaining} ticks!`);
		return false;
	} else {
		console.log("Timer Done!");
		const pos = getOffset(block.getPos(), side);
		const world = block.getWorld();
		shortcutSide[side] = true;
		world.setBlock(pos.getX(), pos.getY(), pos.getZ(), "variedcommodities:placeholder", 8);
		return true;
	}
}

export function timer(e: TimerEvent): void {
	if(!instanceofBlockScripted(e.block)){
		return;
	}
	timerOrBlock(e.id, e.block);
}
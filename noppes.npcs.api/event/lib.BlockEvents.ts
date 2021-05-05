/// <reference no-default-lib="true"/>
/// <reference path="./BlockEvent/BreakEvent.lib.d.ts" />
/// <reference path="./BlockEvent/ClickedEvent.lib.d.ts" />
/// <reference path="./BlockEvent/CollidedEvent.lib.d.ts" />
/// <reference path="./BlockEvent/DoorToggleEvent.lib.d.ts" />
/// <reference path="./BlockEvent/EntityFallenUponEvent.lib.d.ts" />
/// <reference path="./BlockEvent/ExplodedEvent.lib.d.ts" />
/// <reference path="./BlockEvent/HarvestedEvent.lib.d.ts" />
/// <reference path="./BlockEvent/InitEvent.lib.d.ts" />
/// <reference path="./BlockEvent/InteractEvent.lib.d.ts" />
/// <reference path="./BlockEvent/NeighborChangedEvent.lib.d.ts" />
/// <reference path="./BlockEvent/RainFillEvent.lib.d.ts" />
/// <reference path="./BlockEvent/RedstoneEvent.lib.d.ts" />
/// <reference path="./BlockEvent/TimerEvent.lib.d.ts" />
/// <reference path="./BlockEvent/UpdateEvent.lib.d.ts" />
export const SEO_DTS_LIB = true;
declare global {
    function init(e: InitEvent): void
    function tick(e: UpdateEvent): void
    function interact(e: InteractEvent): void
    function redstone(e: RedstoneEvent): void
    function fallenUpon(e: EntityFallenUponEvent): void
    function doorToggle(e: DoorToggleEvent): void
    function broken(e: BreakEvent): void
    function exploded(e: ExplodedEvent): void
    function rainFilled(e: RainFillEvent): void
    function clicked(e: ClickedEvent): void
    function harvested(e: HarvestedEvent): void
    function collide(e: CollidedEvent): void
    function timer(e: TimerEvent): void
}
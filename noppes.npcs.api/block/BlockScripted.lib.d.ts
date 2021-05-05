/// <reference no-default-lib="true"/>
/// <reference path="./Block.lib.d.ts"/>
/// <reference path="./TextPlane.lib.d.ts"/>
/// <reference path="../item/ItemStack.lib.d.ts"/>
/// <reference path="../Timers.lib.d.ts"/>

interface BlockScripted extends Block {
    executeCommand​(command: string): string;
    getHardness(): number;
 	getIsLadder(): boolean;
 	getIsPassible(): boolean
 	getLight(): number
 	getModel(): ItemStack
 	getRedstonePower(): number
 	getResistance(): number
 	getRotationX(): number
 	getRotationY(): number
 	getRotationZ(): number
 	getScaleX(): number
 	getScaleY(): number
 	getScaleZ(): number
 	getTextPlane(): TextPlane
 	getTextPlane2(): TextPlane
 	getTextPlane3(): TextPlane
 	getTextPlane4(): TextPlane
 	getTextPlane5(): TextPlane
 	getTextPlane6(): TextPlane
 	getTimers(): Timers
 	setHardness​(hardness: number): void
 	setIsLadder​(enabled: boolean): void
 	setIsPassible​(passable: boolean): void
 	setLight​(value: number): void
 	setModel​(name: string): void
 	setModel​(item: ItemStack): void
 	setRedstonePower​(strength: number): void
 	setResistance​(resistance: number): void
 	setRotation​(x: number, y: number, z: number): void
 	setScale​(x: number, y: number, z: number): void
}
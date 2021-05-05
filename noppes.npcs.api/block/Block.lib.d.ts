/// <reference no-default-lib="true"/>
/// <reference path="../constants/SideEnum.lib.d.ts" />
/// <reference path="../container/Container.lib.d.ts"/>
/// <reference path="../entity/data/Data.lib.d.ts"/>
/// <reference path="../Nbt.lib.d.ts"/>
/// <reference path="../Pos.lib.d.ts"/>
/// <reference path="../World.lib.d.ts"/>
declare interface Block {
    blockEvent(type: number, data: number): void
    getContainer(): Container
    getDisplayName(): string
    /**
     * Expert users only
     */
    //TODO: fix minecraft type: net.minecraft.block.Block
    getMCBlock(): unknown
    /**
     * Expert users only
     */
    //TODO: fix minecraft type: net.minecraft.block.state.IBlockState
    getMCBlockState(): unknown
    /**
     * Expert users only
     */
    //TODO: fix minecraft type: net.minecraft.tileentity.TileEntity
    getMCTileEntity(): unknown
    getMetadata(): number
    getName(): string
    getPos(): Pos
    /**
     * Stored data persists through world restart.
     */
    getStoreddata(): Data
    /**
     * Stored data persists through world restart.
     */
    getTempdata(): Data
    getTileEntityNBT(): Nbt
    getWorld(): World
    getX(): number
    getY(): number
    getZ(): number
    hasTileEntity(): boolean
    /**
     * Simulates a player interacting with this block (can give weird results)
     */
    interact(side: SideEnum): void
    isAir(): boolean
    isContainer(): boolean
    isRemoved(): boolean
    /**
     * Removes this block
     */
    remove(): void
    setBlock(name: string): Block
    setBlock(block: Block): Block
    setMetadata(i: number): void
    setTileEntityNBT(nbt: Nbt): void
}
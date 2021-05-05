/// <reference no-default-lib="true"/>
/// <reference path="../constants/SideEnum.lib.d.ts" />
/// <reference path="../container/Container.lib.d.ts"/>
/// <reference path="../entity/data/Data.lib.d.ts"/>
/// <reference path="../Nbt.lib.d.ts"/>
/// <reference path="../Pos.lib.d.ts"/>
/// <reference path="../World.lib.d.ts"/>
interface Block {
    blockEvent​(type: number, data: number): void
    getContainer(): Container
    getDisplayName(): string
    //TODO: fix minecraft type: net.minecraft.block.Block
    getMCBlock(): unknown
    //TODO: fix minecraft type: net.minecraft.block.state.IBlockState
    getMCBlockState(): unknown
    //TODO: fix minecraft type: net.minecraft.tileentity.TileEntity
    getMCTileEntity(): unknown
    getMetadata(): number
    getName(): string
    getPos(): Pos
    getStoreddata(): Data
    getTempdata(): Data
    getTileEntityNBT(): Nbt
    getWorld(): World
    getX(): number
    getY(): number
    getZ(): number
    hasTileEntity(): boolean
    interact​(side: SideEnum): void
    isAir(): boolean
    isContainer(): boolean
    isRemoved(): boolean
    remove(): void
    setBlock​(name: string): Block
    setBlock​(block: Block): Block
    setMetadata​(i: number): void
    setTileEntityNBT​(nbt: Nbt): void
}
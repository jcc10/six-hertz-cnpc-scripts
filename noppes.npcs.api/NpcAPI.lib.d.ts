/// <reference no-default-lib="true"/>
/// <reference path="./java_stuff/java.lang.Object.lib.d.ts" />
/// <reference path="./block/Block.lib.d.ts" />
/// <reference path="./container/Container.lib.d.ts" />
/// <reference path="./DamageSource.lib.d.ts" />
/// <reference path="./entity/CustomNpc.lib.d.ts" />
/// <reference path="./entity/Entity.lib.d.ts" />
/// <reference path="./entity/data/PlayerMail.lib.d.ts" />
/// <reference path="./gui/CustomGui.lib.d.ts" />
/// <reference path="./handler/CloneHandler.lib.d.ts" />
/// <reference path="./handler/DialogHandler.lib.d.ts" />
/// <reference path="./handler/FactionHandler.lib.d.ts" />
/// <reference path="./handler/QuestHandler.lib.d.ts" />
/// <reference path="./handler/RecipeHandler.lib.d.ts" />
/// <reference path="./item/ItemStack.lib.d.ts" />
/// <reference path="./Nbt.lib.d.ts" />
/// <reference path="./Pos.lib.d.ts" />
/// <reference path="./World.lib.d.ts" />

interface NpcAPI extends JavaObject {
    createCustomGui(id: number, width: number, height: number, pauseGame: boolean): CustomGui,
    createMail(sender: string, subject: string): PlayerMail,
    //TODO: fix minecraft type: net.minecraft.world.World
    createNPC(world: unknown): CustomNpc,
    //TODO: fix forge type: net.minecraftforge.fml.common.eventhandler.EventBus
    events(): unknown,
    executeCommand(world: World, command: string): unknown,
    getClones(): CloneHandler,
    getDialogs(): DialogHandler,
    getFactions(): FactionHandler,
    //TODO: fix java type: java.io.File
    getGlobalDir(): unknown,
    //TODO: fix minecraft type: net.minecraft.world.World
    //TODO: fix minecraft type: net.minecraft.util.math.BlockPos
    getIBlock​(world: unknown, pos: unknown): Block,
    //TODO: fix minecraft type: net.minecraft.inventory.Container
    getIContainer​(container: unknown): Container,
    //TODO: fix minecraft type: net.minecraft.inventory.IInventory
    getIContainer​(inventory: unknown): Container,
    //TODO: fix minecraft type: net.minecraft.util.DamageSource
    getIDamageSource​(damagesource: unknown): DamageSource,
    //TODO: fix minecraft type: net.minecraft.entity.Entity
    getIEntity​(entity: unknown): Entity,
    //TODO: fix minecraft type: net.minecraft.item.ItemStack
    getIItemStack​(itemstack: unknown): ItemStack,
    //TODO: fix minecraft type: net.minecraft.nbt.NBTTagCompound
    getINbt​(compound: unknown): Nbt,
    getIPos​(x: number, y: number, z: number): Pos,
    getIWorld​(dimensionId: number): World,
    getIWorld​(): World,
    getIWorlds(): World[],
    getQuests(): FactionHandler,
    getRandomName​(dictionary: number, gender: number): string,
    getRawPlayerData​(uuid: string): Nbt,
    getRecipes(): FactionHandler,
    //TODO: fix java type: java.io.File
    getWorldDir(): unknown,
    hasPermissionNode​(permission: string): boolean,
    Instance(): NpcAPI,
    IsAvailable(): boolean,
    registerCommand​(): void,
    registerPermissionNode​(permission: string): void,
    //TODO: fix minecraft type: net.minecraft.world.World
    spawnNPC​(world: unknown, x: number, y: number, z: number): CustomNpc,
    stringToNbt​(): Nbt,
}
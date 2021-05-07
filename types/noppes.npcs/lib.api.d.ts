/// <reference no-default-lib="true"/>
/// <reference lib="es2015"/>
/// <reference path="../minecraft/lib.types.d.ts"/>

    /**
     *  BASE API
     */

//deno-lint-ignore no-empty-interface
interface IContainer {}
//deno-lint-ignore no-empty-interface
interface IContainerCustomChest {}
//deno-lint-ignore no-empty-interface
interface IDamageSource {}
//deno-lint-ignore no-empty-interface
interface IDimension {}
//deno-lint-ignore no-empty-interface
interface INbt {}
/**
 * All the methods in IPos create a new IPos object
 */
interface IPos {
    add(x: number, y: number, z: number): IPos
    add(pos: IPos): IPos
    distanceTo(pos: IPos): number
    down(): IPos
    down(n: number): IPos
    east(): IPos
    east(n: number): IPos
    /**
     * Expert users only
     * net.minecraft.util.math.BlockPos	
     */
    //TODO: Add minecraft type
    getMCBlockPos(): unknown
    getX(): number
    getY(): number
    getZ(): number
    normalize(): number[]
    north(): IPos
    north(n: number): IPos
    offset(direction: number): IPos
    offset(direction: number, n: number): IPos
    south(): IPos
    south(n: number): IPos
    subtract(x: number, y: number, z: number): IPos
    subtract(pos: IPos): IPos
    up(): IPos
    up(n: number): IPos
    west(): IPos
    west(n: number): IPos
}
//deno-lint-ignore no-empty-interface
interface IRayTrace {}
//deno-lint-ignore no-empty-interface
interface IScoreboard {}
//deno-lint-ignore no-empty-interface
interface IScoreboardObjective {}
//deno-lint-ignore no-empty-interface
interface IScoreboardScore {}
//deno-lint-ignore no-empty-interface
interface IScoreboardTeam {}
interface ITimers {
    clear(): void
    /**
     * Used for timer events, wont throw an error if an timer with this id already exists and will overwrite it with this new one
     */
    forceStart(id: number, ticks: number, repeat: boolean): void
    has(id: number): boolean
    /**
     * Resets the timer back to 0
     */
    reset(id: number): void
    /**
     * Used for timer events, will throw an error if a timer with the id is already started
     */
    start(id: number, ticks: number, repeat: boolean): void
    stop(id: number): boolean 	 
}
interface IWorld {
    broadcast(message: string): void
    createEntity(id: string): IEntity
    createEntityFromNBT(nbt: INbt): IEntity
    createItem(name: string, damage: number, size: number): IItemStack
    createItemFromNbt(nbt: INbt): IItemStack
    explode(x: number, y: number, z: number, range: number, fire: boolean, grief: boolean): void
    /**
     * This gets all currently loaded entities in a world
     */
    getAllEntities(type: number): IEntity[]
    getAllPlayers(): IPlayer[]
    getBiomeName(x: number, z: number): string
    getBlock(x: number, y: number, z: number): IBlock
    /**
     * Deprecated.
     */
    getClone(tab: number, name: string): IEntity
    /**
     * Deprecated. 
     */
    getClosestEntity(x: number, y: number, z: number, range: number, typ: number): IEntity
    getClosestEntity(pos: IPos, range: number, type: number): IEntity
    getDimension(): IDimension
    getEntity(uuid: string): IEntity
    getLightValue(x: number, y: number, z: number): number
    /**
     * Expert users only
     * net.minecraft.util.math.BlockPos
     */
    getMCBlockPos(x: number, y: number, z: number): unknown
    /**
     * Expert users only
     * net.minecraft.world.WorldServer
     */
    getMCWorld(): unknown
    getName(): string
    /**
     * Deprecated. 
     */
    getNearbyEntities(x: number, y: number, z: number, range: number, type: number): IEntity[]
    getNearbyEntities(pos: IPos, range: number, type: number): IEntity[]
    getPlayer(name: string): IPlayer
    getRedstonePower(x: number, y: number, z: number): number
    getScoreboard(): IScoreboard
    getSpawnPoint(): IBlock
    /**
     * Stored data persists through world restart.
     */
    getStoreddata(): IData
    /**
     * Stores any type of data, but will be gone on restart Temp data is the same cross dimension
     */
    getTempdata(): IData
    getTime(): number
    getTotalTime(): number
    isDay(): boolean
    isRaining(): boolean
    /**
     * Sound will be played in a 16 block range
     */
    playSoundAt(pos: IPos, sound: string, volume: number, pitch: number): void
    removeBlock(x: number, y: number, z: number): void
    setBlock(x: number, y: number, z: number, name: string, meta: number): void
    setRaining(bo: boolean): void
    setSpawnPoint(block: IBlock): void
    setTime(time: number): void
    /**
     * Deprecated.
     */
    spawnClone(x: number, y: number, z: number, tab: number, name: string): IEntity
    spawnEntity(entity: IEntity): void
    /**
     * Sends a packet from the server to the client everytime its called.
     */
    spawnParticle(particle: string, x: number, y: number, z: number, dx: number, dy: number, dz: number, speed: number, coun: number): void
    thunderStrike(x: number, y: number, z: number): void
}


declare class CommandNoppesBase {}
/**
 * Note this API should only be used Server side not on the client
 */
declare class NpcAPI {
    createCustomGui(id: number, width: number, height: number, pauseGame: boolean): ICustomGui
    createMail(sender: string, subject: string): IPlayerMail
    /**
     * Doesn't spawn the npc in the world
     */
    createNPC(world: net_minecraft_world_World): ICustomNpc
    /**
     * Used by modders
     * net.minecraftforge.fml.common.eventhandler.EventBus
     */
    //TODO: Add minecraft type
    events(): unknown

    executeCommand(world: IWorld, command: string): string
    getClones(): ICloneHandler
    getDialogs(): IDialogHandler
    getFactions(): IFactionHandler
    /**
     * java.io.File
     */
    //TODO: Add java type
    getGlobalDir(): unknown
    //TODO: Add minecraft type: net.minecraft.util.math.BlockPos 
    getIBlock(world: net_minecraft_world_World, pos: unknown): IBlock
    //TODO: Add minecraft type: net.minecraft.inventory.Container 
    getIContainer(container: unknown): IContainer
    //TODO: Add minecraft type: net.minecraft.inventory.IInventory 
    getIContainer(inventory: unknown): IContainer
    //TODO: Add minecraft type: net.minecraft.util.DamageSource 
    getIDamageSource(damagesource: unknown): IDamageSource
    //TODO: Add minecraft type: net.minecraft.entity.Entity 
    getIEntity(entity: unknown): IEntity
    //TODO: Add minecraft type: net.minecraft.item.ItemStack 
    getIItemStack(itemstack: unknown): IItemStack
    //TODO: Add minecraft type: net.minecraft.nbt.NBTTagCompound 
    getINbt(compound: unknown): INbt
    getIPos(x: number, y: number, z: number): IPos
    getIWorld(dimensionId: number): IWorld
    //TODO: Add minecraft type: net.minecraft.world.WorldServer
    getIWorld(world: unknown): IWorld
    getIWorlds(): IWorld[]
    getQuests(): IQuestHandler
    getRandomName(dictionary: number, gender: number): string
    /**
     * Get player data even if they are offline
     */
    getRawPlayerData(uuid: string): INbt
    getRecipes(): IRecipeHandler
    /**
     * java.io.File
     */
    //TODO: Add java type
    getWorldDir(): unknown 
    hasPermissionNode(permission: string): boolean
    static Instance(): NpcAPI
    static IsAvailable(): boolean
    /**
     * Use to register your own /noppes subcommand
     */
    registerCommand(command: CommandNoppesBase): void
    registerPermissionNode(permission: string, defaultType: number): void
    /**
     * Creates and spawns an npc
     */
    spawnNPC(world: net_minecraft_world_World, x: number, y: number, z: number): ICustomNpc

    stringToNbt(str: string): INbt
}


declare class CustomNPCsException {}

    /**
     *  BLOCKS
     */

interface IBlock {
    blockEvent(type: number, data: number): void
    getContainer(): IContainer
    getDisplayName(): string
    /**
     * Expert users only
     * net.minecraft.block.Block 	
     */
    //TODO: Add minecraft type
    getMCBlock(): unknown
    /**
     * Expert users only
     * net.minecraft.block.state.IBlockState
     */
    //TODO: Add minecraft type
    getMCBlockState(): unknown
    /**
     * Expert users only
     * net.minecraft.tileentity.TileEntity
     */
    //TODO: Add minecraft type
    getMCTileEntity(): unknown	
    getMetadata(): number
    getName(): string
    getPos(): IPos
    /**
     * Stored data persists through world restart.
     */
    getStoreddata(): IData
    /**
     * Temp data stores anything but only untill it's reloaded.
     */
    getTempdata(): IData
    getTileEntityNBT(): INbt
    getWorld(): IWorld
    getX(): number
    getY(): number
    getZ(): number
    hasTileEntity(): boolean
    /**
     * Simulates a player interacting with this block (can give weird results)
     */ 
    interact(side: number): void
    isAir(): boolean
    isContainer(): boolean
    isRemoved(): boolean
    /**
     * Removes this block
     */ 
    remove(): void
    setBlock(name: string): IBlock 
    setBlock(block: IBlock): IBlock
    setMetadata(i: number): void
    setTileEntityNBT(nbt: INbt): void
}

/**
 * Used for certain technical mods which use FluidContainer blocks *
 */
//deno-lint-ignore no-empty-interface
interface IBlockFluidContainer {}
interface IBlockScripted extends IBlock {
    /**
     * On servers the enable-command-block option in the server.properties needs to be set to true
     * Use /gamerule commandBlockOutput false/true to turn off/on command block feedback
     * Setting NpcUseOpCommands to true in the CustomNPCs.cfg should allow the npc to run op commands, be warned this could be a major security risk, use at own risk
     * For permission plugins the commands are run under uuid:c9c843f8-4cb1-4c82-aa61-e264291b7bd6 and name:[customnpcs]
     */
    executeCommand(command: string): string
    getHardness(): number
    getIsLadder(): boolean
    getIsPassible(): boolean
    getLight(): number
    getModel(): IItemStack
    getRedstonePower(): number
    getResistance(): number
    getRotationX(): number
    getRotationY(): number
    getRotationZ(): number
    getScaleX(): number
    getScaleY(): number
    getScaleZ(): number
    getTextPlane(): ITextPlane
    getTextPlane2(): ITextPlane
    getTextPlane3(): ITextPlane
    getTextPlane4(): ITextPlane
    getTextPlane5(): ITextPlane
    getTextPlane6(): ITextPlane
    getTimers(): ITimers	 
    setHardness(hardness: number): void
    setIsLadder(enabled: boolean): void
    setIsPassible(bo: boolean): void
    setLight(value: number): void
    setModel(name: string): void
    setModel(item: IItemStack): void
    setRedstonePower(strength: number): void
    setResistance(resistance: number): void
    setRotation(x: number, y: number, z: number): void
    setScale(x: number, y: number, z: number): void
}
//deno-lint-ignore no-empty-interface
interface IBlockScriptedDoor {}
//deno-lint-ignore no-empty-interface
interface ITextPlane {}

    /**
     *  CONSTANTS
     */

/**
 * Animation Types
 */
declare enum AnimationType {
    NORMAL = 0,
    SIT = 1,
    SLEEP = 2,
    HUG = 3,
    SNEAK = 4,
    DANCE = 5,
    AIM = 6,
    CRAWL = 7,
    POINT = 8,
    CRY = 9,
    WAVE = 10,
    BOW = 11,
    NO = 12,
    YES = 13,
    DEATH = 14,
}
/**
 * Entity Types
 */
declare enum EntityType {
    ANY = -1,
    UNKNOWN = 0,
    PLAYER,
    NPC,
    MONSTER,
    ANIMAL,
    LIVING,
    ITEM,
    PROJECTILE,
    PIXELMON,
    VILLAGER,
    ARROW,
    THROWABLE,
}

declare enum GuiComponentType {
    BUTTON = 0,
    LABEL = 1,
    TEXTURED_RECT = 2,
    TEXT_FIELD = 3,
    SCROLL = 4,
    ITEM_SLOT = 5,
}
/**
 * Item Types
 */
declare  enum ItemType {
    NORMAL = 0,
    BOOK = 1,
    BLOCK = 2,
    ARMOR = 3,
    SWORD = 4,
    SEEDS = 5,
    SCRIPTED = 6,
}
/**
 * Job Types
 */
declare enum JobType {}
declare enum MarkType {} 	 
declare enum OptionType {}
declare  enum ParticleType {}
declare  enum PotionEffectType {}
declare  enum QuestType {}
/**
 * Role Types
 */
declare  enum RoleType {}
/**
 * Facing Types
 */
declare enum SideType {
    DOWN = 0,
    UP,
    NORTH,
    SOUTH,
    WEST,
    EAST,
}
/**
 * Tactical Variant Types
 */
declare enum TacticalType {}

    /**
     *  ENTITY
     */

//deno-lint-ignore no-empty-interface
interface IAnimal {}
//deno-lint-ignore no-empty-interface
interface IArrow {}
//deno-lint-ignore no-empty-interface
interface ICustomNpc {}
interface IEntity {
    addRider(entity: IEntity): void 
    addTag(tag: string): void
    clearRiders(): void
    damage(amount: number): void
    /**
     * Despawns this entity.
     */
    despawn(): void

    dropItem(item: IItemStack): IEntityItem
    /**
     * Removes fire from this entity
     */
    extinguish(): void

    generateNewUUID(): string	 
    getAge(): number
    getAllRiders(): IEntity[]
    getBlockX(): number
    getBlockY(): number
    getBlockZ(): number
    getEntityName(): number 
    /**
     * This is not a function you should be calling every tick.
     */
    getEntityNbt(): INbt

    getEyeHeight(): number
    getHeight(): number
    /**
     * Expert users only
     * net.minecraft.entity.Entity
     */ 
    //TODO: Add minecraft type
    getMCEntity(): unknown	

    getMotionX(): number
    getMotionY(): number
    getMotionZ(): number
    getMount():IEntity
    getName(): string
    /**
     * The Entity's extra stored NBT data
     */ 
    getNbt(): INbt

    getPitch(): number
    getPos(): IPos
    getRiders(): IEntity[]
    getRotation(): number
    /**
     * Stored data persists through world restart.
     */
    getStoreddata(): IData

    /**
     * Tags are used by scoreboards and can be used in commands
     */
    getTags(): string[]

    /**
     * Temp data stores anything but only untill it's reloaded
     */
    getTempdata(): IData

    getType(): number
    getTypeName(): string
    getUUID(): string
    getWidth(): number
    getWorld(): IWorld
    getX(): number
    getY(): number
    getZ(): number
    hasCustomName(): boolean
    hasTag(tag: string): boolean
    inFire(): boolean
    inLava(): boolean
    inWater(): boolean
    isAlive(): boolean
    isBurning(): boolean
    isSneaking(): boolean
    isSprinting(): boolean
    /**
     * Kill the entity, doesnt't despawn it
     */
    kill(): void

    knockback(power: number, direction: number): void
    /**
     * Play specific minecraft animations client side 0 and 3 are for EntityLivingBase entities and 2 is only for players
     */
    playAnimation(type: number): void

    /**
     * Gets the first block within distance the npc is looking at
     */
    rayTraceBlock(distance: number, stopOnLiquid: boolean, ignoreBlockWithoutBoundingBox: boolean): IRayTrace

    /**
     * Gets the entities within distance the npc is looking at sorted by distance
     */
    rayTraceEntities(distance: number, stopOnLiquid: boolean, ignoreBlockWithoutBoundingBox: boolean): IEntity[]

    removeTag(tag: string): void
    setBurning(seconds: string): void
    /**
     * This is not a function you should be calling every tick
     */	
    setEntityNbt(nbt: INbt): void

    setMotionX(motion: number): void
    setMotionY(motion: number): void
    setMotionZ(motion: number): void
    setMount(entity: IEntity): void
    setName(name: number): void
    setPitch(pitch: number): void
    setPos(pos: IPos): void
    setPosition(x: number, y: number, z: number): void
    setRotation(rotation: number): void
    setX(x: number): void
    setY(y: number): void
    setZ(z: number): void
    /**
     * Spawns this entity into the world (For NPCs dont forget to set their home position)
     */	 
    spawn(): void

    /**
     * Stores the entity as clone server side
     */
    storeAsClone(tab: number, name: string): void

    typeOf(type: number): boolean
}
//deno-lint-ignore no-empty-interface
interface IEntityItem {}
//deno-lint-ignore no-empty-interface
interface IEntityLiving {}
interface IEntityLivingBase extends IEntity {
    addMark(type: number): IMark 
    /**
     * Works the same as the /effect command
     */
    addPotionEffect(effect: number, duration: number, strength: number, hideParticles: boolean): void
    canSeeEntity(entity: IEntity): boolean
    clearPotionEffects(): void
    /**
     * Note not all Living Entities support this
     */
    getArmor(slot: number): IItemStack
    getAttackTarget(): IEntityLivingBase
    getHealth(): number
    getLastAttacked(): IEntityLivingBase
    getLastAttackedTime(): number
    getMainhandItem(): IItemStack
    getMarks(): IMark[]
    getMaxHealth(): number
    /**
     * Expert users only
     * net.minecraft.entity.EntityLivingBase
     */ 
    //TODO: Add minecraft type
    getMCEntity(): unknown
    getMoveForward(): number
    getMoveStrafing(): number
    getMoveVertical(): number
    getOffhandItem(): IItemStack
    getPotionEffect(effect: number): number
    isAttacking(): boolean
    isChild(): boolean
    removeMark(mark: IMark): void
    setArmor(slot: number, item: IItemStack): void
    setAttackTarget(living: IEntityLivingBase): void
    setHealth(health: number): void
    setMainhandItem(item: IItemStack): void
    setMaxHealth(health: number): void
    setMoveForward(move: number): void
    setMoveStrafing(move: number): void
    setMoveVertical(move: number): void
    setOffhandItem(item: IItemStack): void
    swingMainhand(): void
    swingOffhand(): void
}
//deno-lint-ignore no-empty-interface
interface IMonster {}
//deno-lint-ignore no-empty-interface
interface IPixelmon {}
interface IPlayer extends IEntityLivingBase {
    //TODO: Re enable commented out methods.
    addDialog(id: number): void
    addFactionPoints(faction: number, points: number): void
    canQuestBeAccepted(id: number): boolean
    /**
     * WANRING, REMOVES ALL PLAYER DATA (data only from CustomNPCs, does not clear inventory etc)
     */
    clearData(): void

    closeGui(): void
    factionStatus(factionId: number): number
    /**
     * Add the quest from finished quest list
     */
    finishQuest(id: number): void

    //getActiveQuests(): IQuest[]
    //getCustomGui(): ICustomGui
    getDisplayName(): string 
    getExpLevel(): number
    getFactionPoints(faction: number): number 
    //getFinishedQuests(): IQuest[]	 
    getGamemode(): number
    getHunger(): number
    getInventory(): IContainer

    /**
     * Expert users only
     * net.minecraft.entity.player.EntityPlayerMP
     */ 
    //TODO: Add minecraft type
    getMCEntity():unknown

    getOpenContainer(): IContainer

    /**
     * I haven't bothered figuring this out since I don't use the mod.
     */ 
    //TODO: Figure out the types for this one
    getPixelmonData(): unknown
    getSpawnPoint(): IBlock
    getTimers(): ITimers
    giveItem(id: string, damage: number, amount: number): boolean
    giveItem(item: IItemStack): boolean
    hasAchievement(achievement: string): boolean
    hasActiveQuest(id: number): boolean
    hasFinishedQuest(id: number): boolean
    hasPermission(permission: string): boolean
    hasReadDialog(id: number): boolean
    /**
     * Deprecated. 
     */
    inventoryItemCount(id: string, damage: number): number

    /**
     * Deprecated. 
     */
    inventoryItemCount(item: IItemStack): number

    kick(message: string): void
    message(essage: string): void
    playSound(sound: string, volume: number, pitch: number): void
    removeAllItems(item: IItemStack): void
    removeDialog(id: number): void
    removeItem(id: string, damage: number, amount: number): boolean
    removeItem(item: IItemStack, amount: number): boolean
    /**
     * Removes the quest from active and finished quest list
     */
    removeQuest(id: number): void

    resetSpawnpoint(): void
    //sendMail(mail: IPlayerMail): void
    sendNotification(title: string, msg: string, type: number): void
    setExpLevel(level: number): void
    setGamemode(mode: number): void
    setHunger(level: number): void
    /**
     * Same as the /spawnpoint command
     */
    setSpawnpoint(x: number, y: number, z: number): void

    setSpawnPoint(block: IBlock): void
    /**
     * Deprecated.
     * Its better to use showCustomGui
     */
    showChestGui(rows: number): IContainer

    /**
     * Open a ICustomGui to this player.
     */
    //showCustomGui(gui: ICustomGui): void

    showDialog(id: number, name: string): void
    startQuest(id: number): void
    /**
     * Removes the quest from active quest list
     */
    stopQuest(id: number): void

    /**
     * Syncs inventory changes to the client side.
     */
    updatePlayerInventory(): void

}
//deno-lint-ignore no-empty-interface
interface IProjectile {}
//deno-lint-ignore no-empty-interface
interface IThrowable {}
//deno-lint-ignore no-empty-interface
interface IVillager {}

    /**
     * ENTITY.DATA
     */

//deno-lint-ignore no-empty-interface
interface IData {}

//deno-lint-ignore no-empty-interface
interface ILine {}

//deno-lint-ignore no-empty-interface
interface IMark {}


//deno-lint-ignore no-empty-interface
interface INPCAdvanced {}

//deno-lint-ignore no-empty-interface
interface INPCAi {}

//deno-lint-ignore no-empty-interface
interface INPCDisplay {}

//deno-lint-ignore no-empty-interface
interface INPCInventory {}

//deno-lint-ignore no-empty-interface
interface INPCJob {}

//deno-lint-ignore no-empty-interface
interface INPCMelee {}

//deno-lint-ignore no-empty-interface
interface INPCRanged {}

//deno-lint-ignore no-empty-interface
interface INPCRole {}

//deno-lint-ignore no-empty-interface
interface INPCStats {}

/**
 * Returns objects from the Pixelmon API see https://reforged.gg/docs/
 */
//deno-lint-ignore no-empty-interface
interface IPixelmonPlayerData {}

//deno-lint-ignore no-empty-interface
interface IPlayerMail {}

    /**
     * ENTITY.DATA.ROLE
     * TODO: Add this
     */

    /**
     * GUI
     */

//deno-lint-ignore no-empty-interface
interface IButton {}
//deno-lint-ignore no-empty-interface
interface ICustomGui {}
//deno-lint-ignore no-empty-interface
interface ICustomGuiComponent {}
//deno-lint-ignore no-empty-interface
interface IItemSlot {}
//deno-lint-ignore no-empty-interface
interface ILabel {}
//deno-lint-ignore no-empty-interface
interface IScroll {}
//deno-lint-ignore no-empty-interface
interface ITextField {}
//deno-lint-ignore no-empty-interface
interface ITexturedButton {}
//deno-lint-ignore no-empty-interface
interface ITexturedRect {}

    /**
     * HANDLER
     * TODO: Add this
     */


//deno-lint-ignore no-empty-interface
interface ICloneHandler {}

//deno-lint-ignore no-empty-interface
interface IDialogHandler {}

//deno-lint-ignore no-empty-interface
interface IFactionHandler {}

//deno-lint-ignore no-empty-interface
interface IQuestHandler {}

//deno-lint-ignore no-empty-interface
interface IRecipeHandler {}

    /**
     * HANDLER.DATA
     * TODO: Add this
     */

    /**
     * ITEM
     * TODO: Add this
     */

//deno-lint-ignore no-empty-interface
interface IItemArmor {}
//deno-lint-ignore no-empty-interface
interface IItemBlock {}
//deno-lint-ignore no-empty-interface
interface IItemBook {}
//deno-lint-ignore no-empty-interface
interface IItemScripted {}
//deno-lint-ignore no-empty-interface
interface IItemStack {}
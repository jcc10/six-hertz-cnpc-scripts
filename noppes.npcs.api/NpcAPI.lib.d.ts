/// <reference no-default-lib="true"/>
/// <reference path="./java_stuff/java.lang.Object.lib.d.ts" />
/// <reference path="./container/Container.lib.d.ts" />
/// <reference path="./DamageSource.lib.d.ts" />
/// <reference path="./Nbt.lib.d.ts" />
/// <reference path="./Pos.lib.d.ts" />
/// <reference path="./World.lib.d.ts" />

interface NpcAPI extends JavaObject {
    createCustomGui(id: number, width: number, height: number, pauseGame: boolean): unknown,
    createMail(sender: string, subject: string): unknown,
    createNPC(world: unknown): unknown,
    events(): unknown,
    executeCommand(world: World, command: string): unknown,
    getClones(): unknown,
    getDialogs(): unknown,
    getFactions(): unknown,
    getGlobalDir(): unknown,
    getIBlock​(world: unknown, pos: unknown): unknown,
    getIContainer​(container: unknown): Container,
    getIContainer​(inventory: unknown): Container,
    getIDamageSource​(damagesource: unknown): DamageSource,
    getIEntity​(entity: unknown): unknown,
    getIItemStack​(itemstack: unknown): unknown,
    getINbt​(compound: unknown): Nbt,
    getIPos​(x: number, y: number, z: number): Pos,
    getIWorld​(dimensionId: number): World,
    getIWorld​(): World,
    getIWorlds(): World[],
    getQuests(): unknown,
    getRandomName​(dictionary: number, gender: number): unknown,
    getRawPlayerData​(uuid: string): Nbt,
    getRecipes(): unknown,
    getWorldDir(): unknown,
    hasPermissionNode​(permission: string): boolean,
    Instance(): unknown,
    IsAvailable(): boolean,
    registerCommand​(): void,
    registerPermissionNode​(permission: string): void,
    spawnNPC​(world: unknown, x: number, y: number, z: number): unknown,
    stringToNbt​(): Nbt,
}
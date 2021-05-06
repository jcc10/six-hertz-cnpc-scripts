/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/lib.api.d.ts" />

export class Console {
    private world: IWorld;
    private api: NpcAPI;
    constructor(world: IWorld, api: NpcAPI) {
        this.world = world;
        this.api = api;
    }

    log(message: string){
        this.api.executeCommand(this.world, `/say ${message}`);
    }
}
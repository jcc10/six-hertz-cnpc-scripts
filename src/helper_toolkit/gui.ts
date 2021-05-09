/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/events/lib.CustomGui.d.ts"/>

export class IdRegister {
    rangeStart: number;
    rangeEnd: number;
    startfrom: number;
    private active: number[] = [];
    constructor(rangeStart: number, rangeEnd: number){
        this.rangeStart = rangeStart;
        this.rangeEnd = rangeEnd;
        this.startfrom = rangeStart;
        if(rangeStart >= rangeEnd){
            throw new Error("Invalid Range");
        }
    }
    next(): number {
        let looped = false;
        for(let i = this.startfrom; true; i++){
            if( i >= this.rangeEnd){
                if(looped){
                    break;
                }
                i = this.startfrom;
                looped = true;
            }
            if(this.active.includes(i)){
                continue;
            }
            this.active.push(i);
            this.startfrom = i;
            return i;
        }
        throw new Error("Couldn't find free gui ID.");
    }

    remove(id: number){
        this.active = this.active.filter((v) => v!=id);
    }

    activeCount(): number {
        return this.active.length;
    }

    dumpActive(): number[] {
        return this.active;
    }
}

export class GemCreator {
    api: NpcAPI;
    idGen: IdRegister;
    items: Record<string, GEM>;
    itemCount = 0;
    constructor(api: NpcAPI, idRangeStart: number, idRangeEnd: number){
        this.api = api;
        this.idGen = new IdRegister(idRangeStart, idRangeEnd);
        this.items = {};
    }

    newItem(parent: number | null){
        const id = this.idGen.next();
        this.items[id + ""] = new GEM(id, parent, this);
        if(parent){
            this.items[parent+""].addChild(id);
        }
        this.itemCount++;
        return this.items[id + ""];
    }

    remove(id: number, skipUp = false){
        if(!this.items[id + ""]){
            // Sometimes getting a id leak.
            this.api.executeCommand(this.api.getIWorlds()[0], "/say GUI ID Leak detected.");
            this.api.executeCommand(this.api.getIWorlds()[0], `/say ${this.idGen.activeCount()} reported hanging id's by idGenerator.`);
            this.api.executeCommand(this.api.getIWorlds()[0], `/say ${this.itemCount} reported hanging items by GemCreator.`);
            this.api.executeCommand(this.api.getIWorlds()[0], `/say ${id} removed skipUp set to ${skipUp}.`);
            return;
        }
        for(const child of this.items[id + ""].children) {
            this.remove(child, true);
        }
        if(!skipUp){
            const parent = this.items[id + ""].parent;
            if(parent){
                this.remove(parent, false);
            }
        }
        this.idGen.remove(id);
        delete this.items[id+""]
        this.itemCount--;
    }

    ButtonEventHandler(e: ButtonEvent){
        const id = e.buttonId + "";
        if(this.items[id]){
            this.items[id]._TriggerButtonEvent(e);
        }
    }

    ScrollEventHandler(e: ScrollEvent){
        const id = e.scrollId + "";
        if(this.items[id]){
            this.items[id]._TriggerScrollEvent(e);
        }
    }

    CloseEventHandler(e: CloseEvent){
        const id = e.gui.getID();
        if(this.items[id + ""]){
            this.items[id + ""]._TriggerCloseEvent(e);
        }
        this.remove(id);
    }

    SlotEventHandler(e: SlotEvent){
        const id = e.slotId + "";
        if(this.items[id]){
            this.items[id]._TriggerSlotEvent(e);
        }
    }
}

/**
 * Gui Events Manager
 */
export class GEM {

    private BEI: (e: ButtonEvent) => void = ()=>{};
    private CEI: (e: CloseEvent) => void = ()=>{};
    private ScEI: (e: ScrollEvent) => void = ()=>{};
    private SlEI: (e: SlotEvent) => void = ()=>{};
    readonly id: number;
    children: number[] = []
    parent: number | null;
    private processor: GemCreator;

    constructor(id: number, parent: number | null, processor: GemCreator){
        this.id = id;
        this.parent = parent;
        this.processor = processor;
    }

    addChild(id: number) {
        this.children.push(id);
    }

    newChild() {
        const newGem = this.processor.newItem(this.id);
        return newGem;
    }

    _TriggerButtonEvent(e: ButtonEvent): void{
        this.BEI(e);
    }

    SetButtonEvent(f: (e: ButtonEvent) => void): void {
        this.BEI = f;
    }

    _TriggerCloseEvent(e:CloseEvent): void {
        this.CEI(e);
    }

    SetCloseEvent(f: (e: CloseEvent) => void): void {
        this.CEI = f;
    }

    _TriggerScrollEvent(e:ScrollEvent): void {
        this.ScEI(e);
    }

    SetScrollEvent(f: (e: ScrollEvent) => void): void {
        this.ScEI = f;
    }

    _TriggerSlotEvent(e:SlotEvent): void {
        this.SlEI(e);
    }

    SetSlotEvent(f: (e: SlotEvent) => void): void {
        this.SlEI = f;
    }

    remove() {
        this.processor.remove(this.id);
    }
}
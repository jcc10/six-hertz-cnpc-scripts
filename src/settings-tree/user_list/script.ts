/// <reference no-default-lib="true"/>
/// <reference path="../../../types/noppes.npcs/events/lib.ScriptedBlock.d.ts"/>
/// <reference path="../../../types/noppes.npcs/events/lib.CustomGui.d.ts"/>
import { GemCreator } from "../../helper_toolkit/gui.ts";
import { readJsonFile } from "../../helper_toolkit/fs.ts";
/* spell-checker: disable-next-line  */
import { path } from "../../consts.ts"
import { guiInstance } from "./gui.ts"
var gemC: GemCreator;

export function init(e: InitEvent){
    gemC = new GemCreator(e.API, 0, 999);
}

export function interact(e: InteractEvent) {
    const Gem = gemC.newItem(null);
    const api = e.API;
    const worldPath = api.getWorldDir().toString() + path
    const gui = new guiInstance(e.API, Gem, worldPath);
    const resp = readJsonFile(api, path, "test.json");
    let dGUI: ICustomGui;
    if(typeof resp == "string"){
        dGUI = gui.initialShow({}, e.player.getDisplayName(), resp);
    } else {
        const userData = <Record<string, Record<string, string>>>resp;
        dGUI = gui.initialShow(userData, e.player.getDisplayName());
    }
    e.player.showCustomGui(dGUI);
}

export function customGuiScroll(e: ScrollEvent) {
    gemC.ScrollEventHandler(e);
}

export function customGuiButton(e: ButtonEvent){
    gemC.ButtonEventHandler(e);
}

export function customGuiClosed(e: CloseEvent){
    gemC.CloseEventHandler(e);
}

export function customGuiSlot(e: SlotEvent){
    gemC.SlotEventHandler(e);
}
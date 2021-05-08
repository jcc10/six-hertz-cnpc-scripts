/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/events/lib.ScriptedBlock.d.ts"/>
/// <reference path="../../types/noppes.npcs/events/lib.CustomGui.d.ts"/>
import { Console } from "../helper_toolkit/console.ts";
import { readDir, readFile } from "../helper_toolkit/fs.ts";
/* spell-checker: disable-next-line  */
import { guiBase, guiSizes } from "../consts.ts"
var console: Console;
var gui: ICustomGui;
var pathBox: ITextField
var userBox: ITextField
var permittedBox: ITextField
var noteBox: ITextField
var permittedList: IScroll
var permittedListHeight: number;
var closeButton: IButton
var userData: Record<string, Record<string, string>> = {};
var userID: string[] = [];
var worldPath: string = "";

export function init(e: InitEvent){
	console = new Console(e.block.getWorld(), e.API);
    /* spell-checker: disable-next-line  */
    const guiInfo = guiSizes["customnpcs:largebg.png"];
    gui = e.API.createCustomGui((guiBase + 0), guiInfo.x, guiInfo.y, false);
    gui.setBackgroundTexture(guiInfo.location);
    let id = 0;
    let runningY = 0;
    pathBox = gui.addTextField((id += 1), 5, (runningY += 6), (guiInfo.x - 10), 20);
    runningY += 20
    userBox = gui.addTextField((id += 1), 5, (runningY += 5), (guiInfo.x - 10), 20);
    runningY += 20
    permittedBox = gui.addTextField((id += 1), 5, (runningY += 5), (guiInfo.x - 10), 20);
    runningY += 20
    noteBox = gui.addTextField((id += 1), 5, (runningY += 5), (guiInfo.x - 10), 20);
    runningY += 20
    permittedListHeight = ((guiInfo.y - (runningY + 6 + 5))- 25)
    permittedList = gui.addScroll((id += 1), 5, (runningY += 5), (guiInfo.x - 10), permittedListHeight,
    ["Authorized User List Failed To Update"]);
    runningY += permittedListHeight;
    closeButton = gui.addButton((id += 1), "Close", 5, (runningY + 5), (guiInfo.x - 10), 20);
}

export function interact(e: InteractEvent) {
    const api = e.API;
    const updateWorked = updateUserData(api);
    pathBox.setText(worldPath + "/test.json");
    if(!updateWorked){
        userBox.setText(e.player.getName());
        permittedBox.setText(false + "");
        e.player.showCustomGui(gui);
    }
    const playerName = e.player.getName()
    getUserDetails(playerName);
    userID = [];
    let isOnList: boolean | number = false;
    let n = 0;
    for(const user in userData){
        userID.push(user);
        if(user == playerName){
            isOnList = n;
        }
        n++;
    }
    permittedList.setList(userID);
    if(typeof isOnList == "number"){
        permittedList.setDefaultSelection(isOnList);
    }
    permittedList.setSize(permittedList.getWidth(), permittedListHeight);
    gui.updateComponent(permittedList);
    e.player.showCustomGui(gui);
}

function updateUserData(api: NpcAPI): boolean{
    try{
        worldPath = api.getWorldDir().toString() + "/6hsc"
            const worldPathContents = readDir(worldPath);
            let hasFile = false;
            for(const i of worldPathContents){
                if(i == "test.json"){
                    hasFile = true;
                    break;
                }
            }
            if(!hasFile){
                return false
            }
            const fileRaw = readFile(worldPath + "/test.json");
            userData = JSON.parse(fileRaw);
            return true;
    } catch {
        return false;
    }
    
}

function getUserDetails(user: string): void{
    userBox.setText(user);
    gui.updateComponent(userBox);
    const permitted = userData[user]?.permitted || false;
    permittedBox.setText(permitted + "");
    gui.updateComponent(permittedBox);
    const note = userData[user]?.note || "";
    noteBox.setText(note);
    gui.updateComponent(noteBox);
}

export function customGuiScroll(e: ScrollEvent) {
    permittedList.setSize(permittedList.getWidth(), permittedListHeight);
    permittedList.setDefaultSelection(e.scrollIndex);
    gui.updateComponent(permittedList);
    let sel: string = e.player.getName()
    if(e.selection[0]){
        sel = e.selection[0]
    }
    getUserDetails(sel);
    gui.update(e.player);
}

export function customGuiButton(e: ButtonEvent){
    e.player.closeGui();
}
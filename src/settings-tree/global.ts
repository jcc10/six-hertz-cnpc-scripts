/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/events/lib.scriptedblock.d.ts"/>
import { Console } from "../helper_toolkit/console.ts";
import { readDir, readFile } from "../helper_toolkit/fs.ts";
import { guiBase, guiSizes } from "../consts.ts"
var console: Console;
var gui: ICustomGui;
var pathBox: ITextField
var userBox: ITextField
var permittedBox: ITextField
var noteBox: ITextField
var permittedList: IScroll
var closeButton: IButton

export function init(e: InitEvent){
	console = new Console(e.block.getWorld(), e.API);
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
    const nextY = ((guiInfo.y - (runningY + 6 + 5))- 20)
    permittedList = gui.addScroll((id += 1), 5, (runningY += 5), (guiInfo.x - 10), nextY,
    ["Authorized User List Failed To Update"]);
    runningY += nextY;
    closeButton = gui.addButton((id += 1), "Close", 5, (runningY + 5))
}

export function interact(e: InteractEvent) {
    const api = e.API;
    const worldPath = api.getWorldDir().toString() + "/6hsc"
    const worldPathContents = readDir(worldPath);
    let hasTest = false;
    for(const i of worldPathContents){
        if(i == "test.json"){
            hasTest = true;
        }
    }
    if(!hasTest){
        console.log("We couldn't find the test.json file.");
        pathBox.setText(worldPath + "/test.json");
        userBox.setText(e.player.getName());
        permittedBox.setText(false + "");
        e.player.showCustomGui(gui);
        return
    }
    const fileRaw = readFile(worldPath + "/test.json");
    const file: Record<string, Record<string, string>> = JSON.parse(fileRaw);
    pathBox.setText(worldPath + "/test.json");
    const playerName = e.player.getName()
    userBox.setText(playerName);
    const permitted = file[playerName]?.permitted || false;
    permittedBox.setText(permitted + "");
    const note = file[playerName]?.note || "";
    noteBox.setText(note);
    const users: string[]= [];
    for(const user in file){
        users.push(user);
    }
    permittedList.setList(users);
    e.player.showCustomGui(gui);
    console.log(permittedList.getHeight() + "");
}
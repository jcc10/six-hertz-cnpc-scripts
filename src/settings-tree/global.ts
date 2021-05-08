/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/events/lib.scriptedblock.d.ts"/>
import { Console } from "../helper_toolkit/console.ts";
import { readDir, readFile } from "../helper_toolkit/fs.ts";
var console: Console;

export function interact(e: InteractEvent) {
	console = new Console(e.block.getWorld(), e.API);
    const api = e.API;
    const worldPath = api.getWorldDir().toString()
    console.log(`World Dir: ${worldPath}`);
    const worldPathContents = readDir(worldPath);
    let sList = "]";
    let first = true;
    let hasTest = false;
    for(const i of worldPathContents){
        let realI = i;
        if(typeof i !== "string"){
            realI = "subDir";
        }
        if(realI == "test.json"){
            hasTest = true;
        }
        if(first){
            first = false;
            sList = "'" + realI + "'" + sList;
            continue;
        }
        sList = "'" + realI + "'" + ", " + sList;
    }
    sList = "[" + sList;
    console.log(sList);
    console.log(`We ${hasTest ? "found" : "didn't find"} the test json file.`)
    const fileRaw = readFile(worldPath + "/test.json");
    const file = JSON.parse(fileRaw);
    console.log(file[0][0] + file[0][1]);
    console.log(file[1][0] + file[1][1]);
    console.log(`file raw: ${fileRaw}`);
}
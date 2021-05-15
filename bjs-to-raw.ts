import { walkSync, emptyDirSync, ensureDirSync } from "https://deno.land/std@0.95.0/fs/mod.ts";

emptyDirSync("./dist");

const exportRegex = /export { (\S*) as (\S*) };/g;
const exportReplace = `var $2 = $1;`


for (const entry of walkSync("./bundle")) {
    if(!entry.isFile){
        continue;
    }
    console.log(entry.path);
    const path = "./dist/" + entry.path.replace(entry.name, "").replace("/bundle", "");
    let file = Deno.readTextFileSync(entry.path);
    file = file.replace(exportRegex, exportReplace);
    ensureDirSync(path);
    console.log(path)
    Deno.writeTextFileSync(path + entry.name, file);
}

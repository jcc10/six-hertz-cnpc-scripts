import { walkSync } from "https://deno.land/std@0.95.0/fs/mod.ts";
import { emptyDirSync } from "https://deno.land/std@0.95.0/fs/mod.ts";

emptyDirSync("./dist2");

const exportRegex = /export { (\S*) as (\S*) };/g;
const exportReplace = `var $2 = $1;`


for (const entry of walkSync("./bundle")) {
    if(!entry.isFile){
        continue;
    }
    console.log(entry.path);
    let file = Deno.readTextFileSync(entry.path);
    file = file.replace(exportRegex, exportReplace);
    Deno.writeTextFileSync("./dist2/" + entry.name, file);
}
import { walkSync } from "https://deno.land/std@0.95.0/fs/mod.ts";
import { emptyDirSync } from "https://deno.land/std@0.95.0/fs/mod.ts";

emptyDirSync("./dist");

const replaceTop = `"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});`

const replacedTop = `"use strict";`;

const exportRegex = /(exports\.)(\S*) = ((\2)1);/g;
const exportReplace = `var $2 = $3;`


for (const entry of walkSync("./built")) {
    if(!entry.isFile){
        continue;
    }
    console.log(entry.path);
    let file = Deno.readTextFileSync(entry.path);
    file = file.replace(replaceTop, replacedTop);
    file = file.replace(exportRegex, exportReplace);
    Deno.writeTextFileSync("./dist/" + entry.name, file);
}
/// <reference no-default-lib="true"/>
/// <reference path="../../types/noppes.npcs/lib.api.d.ts"/>
/// <reference path="../../types/java/lib.Object.d.ts"/>

const File = <java_io_File_constructor>Java.type("java.io.File");
const Files = <java_nio_Files>Java.type("java.nio.file.Files");
const Paths = <java_nio_Paths>Java.type("java.nio.file.Paths");
//deno-lint-ignore no-unused-vars
const Path = <java_nio_Path>Java.type("java.nio.file.Path");
const CHARSET_UTF_8:java_nio_charset_Charset = (<java_nio_charset_StandardCharsets>Java.type("java.nio.charset.StandardCharsets")).UTF_8;
//deno-lint-ignore no-unused-vars
const StandardCopyOption = Java.type('java.nio.file.StandardCopyOption');

//Constants for validatePath
export const PATH_VALIDATION = {
    SUCCESS: 1,
    ABOVE_ROOT: 0, //If the given path is above allowed root while forceRoot is not given
    NOT_EXISTS: -1
};

export function mkPath(path: string): void{
    const dirList = path.split("/");
    let pathWalk = "";
    for (const dir of dirList) {
        pathWalk += (pathWalk == "" ? "" : "/") + dir;
        const pathFile = new File(pathWalk);
        if (!pathFile.exists()) {
            if (dir.match(/[\w]+\.[\w]+/) === null) { //is dir?
                pathFile.mkdir();
            } else {
                pathFile.createNewFile();
            }
        }
    }
}

export type WalkArray = Array<string | WalkArray>;

export function readDir(dirPath: string): WalkArray {
    const res: WalkArray = [];
    const files: java_io_File[] = new File(dirPath).listFiles();
    const fileNames: string[] = new File(dirPath).list();
    for (const i in files) {
        const file = files[i];
        const fileName = fileNames[i];
        if(file.isDirectory()){
            res.push(readDir(file.toString()));
        }
        else{
            const name = fileName;
            res.push(name);
        }
    }
    return res;
}

export function readFile(filePath: string): string {
    const f = (sa: string[]): string => sa.join("\n").replace(/\t/g, "  ");
    try {
        return f(<string[]>Java.from(fileGetter(filePath)));
    } catch {
        return f(fileGetter(filePath));
    }
}

export function readJsonFile(api: NpcAPI, path: string, filename: string): unknown | string {
    const worldPath = api.getWorldDir().toString() + path
    let hasFile = false;
    try{
        const worldPathContents = readDir(worldPath);
        for(const i of worldPathContents){
            if(i == filename){
                hasFile = true;
                break;
            }
        }
    } catch {
        return "Code failure in finding file.";
    }
    if(!hasFile){
        return "File not found.";
    }
    let fileRaw: string;
    try {
        fileRaw = readFile(worldPath + "/" + filename);
    } catch {
        return `Failure to read file ${worldPath + "/" + filename}`;
    }
    try {
        const file = JSON.parse(fileRaw);
        return file;
    } catch {
        return "JSON Parse error.";
    }
}

function fileGetter(filePath: string) {
    const path: java_nio_Path = Paths.get(filePath);
    try {
        const lines = Files.readAllLines(path, CHARSET_UTF_8);
        return lines;
    } catch {
        return [];
    }
}

/*

@module writeToFile(filePath, text, offset = null, length = null): Boolean;
function _$(__$) {
    var path = Paths.get(filePath);
    try {
        var writer = Files.newBufferedWriter(path, CHARSET_UTF_8);
        // if(offset !== null && length !== null) {
            writer.write(text, offset || 0, length || text.length);
        // } else if(length !== null) {
        //     writer.write(text, offset || 0);
        // } else if(offset !== null) {
        //     writer.write(text);
        // }
        writer.close();
        return true;
    } catch (exc) {
        return false
    }
}
@endmodule;

@module function validatePath(path, allowAboveRoot = false): Number;
function _$(__$) {
        var path =  './' + path.toString()
        .replace(/\.\.\\/g, '')
        .replace(/^\.\//g, '')
        .replace(/^\//g, '')
        .replace(/['"]/g, '');
    ;

    var path = new File(path).toPath().normalize();

    var file = new File(path);
    if(!file.exists()) {
        return PATH_VALIDATION.NOT_EXISTS;
    }

    var realPath = file.getCanonicalPath();
    var root = new File('./').getCanonicalPath();

    if(realPath.indexOf(root) == -1 && !allowAboveRoot) {
        return PATH_VALIDATION.ABOVE_ROOT;
    }

    return PATH_VALIDATION.SUCCESS;
}
@endmodule;

@module function escapePath(path, allowAboveRoot = false): String;
function _$(__$) {
    var path =  './' + path.toString()
        .replace(/\.\.\\/g, '')
        .replace(/^\.\//g, '')
        .replace(/^\//g, '')
        .replace(/['"]/g, '');
    ;

    var path = new File(path).toPath().normalize();

    var file = new File(path);
    if(!file.exists()) {
        return './';
    }

    var realPath = file.getCanonicalPath();
    var root = new File('./').getCanonicalPath();

    if(realPath.indexOf(root) == -1 && !allowAboveRoot) {
        return './';
    }

    return path.toString().replace(/\\/g, '/') + '/';
}

function _$Format(__$) {
    return escapePath(__$)
        .replace(/(^"|"$)/g, '')
        .replace(/^\.\//, '');
    ;
}
@endmodule;


@module function copyFile(original, dest);
function _$(__$) {
    var originalFile = new File(original);
    if(!originalFile.exists()) {
        return false;
    }
    Files.copy(originalFile.toPath(), Paths.get(dest), StandardCopyOption.REPLACE_EXISTING);

    return new File(dest).exists();
}
@endmodule;*/
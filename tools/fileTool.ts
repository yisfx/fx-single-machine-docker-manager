
import * as path from "path";
import * as fs from "fs";


export function CopyPath(from: string, target: string) {

    var i = 0;
    fs.readdir(target, function (err, list) {
        if (i == 0) {
            fs.mkdir(path.join(target), function (err) {
                console.log("创建文件夹成功！");
                target = path.join(target);
                walkDir(from, target);
            });
        }
    });
}

function walkDir(from: string, target: string) {
    var list = fs.readdirSync(from);

    list.forEach(async function (item) {
        if (
            fs.statSync(path.join(from, item)).isDirectory()) {
            fs.mkdirSync(path.join(target, item));
            walkDir(path.join(from, item), path.join(target, item));
        } else {
            fs.copyFileSync(path.join(from, item), path.join(target, item));
        }
    });
}

export function filterFileName(name) {
    if (typeof name == "string") {
        let n = name.split('/')
        return n[n.length - 1]
    }
    return name;
}
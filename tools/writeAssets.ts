
import fs from "fs";
import path from "path";
import { CopyPath } from "./fileTool";

export function WriteAssets() {

    let p = path.join(__dirname, "../dist/public/")

    let files = fs.readdirSync(p);

    let ass = {}
    files.map(f => {
        let name = f.split('-')[0];

        ass[name] = f;
    })
    p = path.join(__dirname, "../dist", "conf");
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p)
    }

    fs.writeFileSync(path.join(__dirname, "../dist", "conf", "assets.script.json"), JSON.stringify(ass), { flag: 'w', encoding: 'utf-8', mode: '0666' })

}
export function publishStatic() {
    copyImage();
}

function copyImage() {
    console.log("static path:",path.join(__dirname, "../static/image"), path.join(__dirname, "../dist/public/image"));
    CopyPath(path.join(__dirname, "../static/image"), path.join(__dirname, "../dist/public/image"));
}
export function clean(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                clean(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}
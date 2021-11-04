import gulp, { series } from "gulp";
import webpack from "webpack";
import webpackDevConfig from "./tools/webpack/webpack.dev.config"
import webpackPublishConfig from "./tools/webpack/webpack.publish.config";
import fs from "fs";
import del from "del"
import vinylPaths from "vinyl-paths"

import { exec } from "child_process";

import * as os from "os"

type Platform = 'aix'
    | 'android'
    | 'darwin'
    | 'freebsd'
    | 'linux'
    | 'openbsd'
    | 'sunos'
    | 'win32'
    | 'cygwin'
    | 'netbsd';

const isLunix = os.platform() == "linux"
console.log("current platform:", os.platform())
//watch
gulp.task("listening", (cb) => {
    gulp.watch("/src", () => {
        console.log("in listening")
        cb();
    })
})


gulp.task('delete', async (cb) => {
    gulp.src("./dist/release/*")
        .pipe(vinylPaths(del))
    cb();
})


gulp.task("staticPublish", (cb) => {
    gulp.src("./static/image/**.*")
        .pipe(gulp.dest("./dist/release/public/image/"))
    gulp.src("./static/svg/**.*")
        .pipe(gulp.dest("./dist/release/public/svg/"))
    // gulp.src("./package.json")
    //     .pipe(gulp.dest("./dist/release"))

    let pkg = JSON.parse(fs.readFileSync("./package.json").toString("utf-8"));
    pkg.devDependencies = undefined;
    fs.writeFileSync("./dist/release/package.json", JSON.stringify(pkg, null, 4))
    cb();
})

gulp.task("devStatic", (cb) => {
    gulp.src("./static/image/**.*")
        .pipe(gulp.dest("./dist//dev/public/image/"))
    cb();
})


gulp.task("webpack", (cb) => {
    webpack(
        <webpack.Configuration>{ ...webpackDevConfig },
        (err, stats) => {
            cb();
            if (!!err)
                console.log("webpack err:", err)
        })
})

gulp.task("webpackPublish", (cb) => {
    webpack(
        <webpack.Configuration>{ ...webpackPublishConfig },
        (err, stats) => {
            cb();
            if (!!err)
                console.log("webpack err:", err)
        })
})


gulp.task("tscPublish", (cb) => {
    try {
        console.log("tscPublish ing")
        exec("tsc -b tsconfig.release.json");
    } finally {
        cb()
    }
})

gulp.task("tsc", async (cb) => {
    try {
        if(isLunix){
            await exec(`gnome-terminal --tab -x tsc -b tsconfig.json --watch`)
        }else{
            await exec("start cmd.exe /K tsc -b tsconfig.json --watch")
        }
    } finally {
        cb()
    }
})

gulp.task("run", async (cb) => {
    try {
        if(isLunix){
            await exec(`gnome-terminal --tab -x node ./node_modules/nodemon/bin/nodemon.js`)
        }else{
        await exec("start cmd.exe /K node ./node_modules/nodemon/bin/nodemon.js")
        }
    } finally {
        cb()
    }
})

exports.publish = series(
    "delete",
    "webpackPublish",
    "tscPublish",
    "staticPublish",
);
exports.dev = series(
    "webpack",
    "tsc",
    "devStatic",
    "run"
)
exports.default = series(
    "webpack"
)

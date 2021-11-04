import path from "path";
import os from 'os';
import smart from 'webpack-merge';
import { RouteConfig } from "../../src/framework/route.config";
import { SysConfig } from "../../src/conf/site.config";
import CommonConfig from "./webpack.common";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HappyPack from "happypack";
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
import AssetsPlugin from "assets-webpack-plugin";
import { filterFileName } from "../fileTool";

const config = smart(CommonConfig, {
    entry: () => {
        let dic = {}
        for (let route in RouteConfig) {
            let r = RouteConfig[route]
            dic[r.name] = path.join(__dirname, "../../", "src", "modules", r.page);
        }
        console.log("release:webpack entry:", dic);
        return dic;
    },
    output: {
        filename: '[name].js',
        publicPath: "",
        path: path.join(__dirname, "../../dist/dev", SysConfig.JsPath)
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/[name].css",
            ignoreOrder: false
        }),
        new HappyPack({
            id: "happyBabel",
            use: [{
                path: "ts-loader",
                query: {
                    happyPackMode: true,
                    configFile: "tsconfig.react.json"
                }
            }],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new AssetsPlugin({
            path: path.join(__dirname, "../../dist/dev/conf"),
            filename: "assets.script.json",
            processOutput: function (output) {
                console.log("process assets");
                const scripts = Object.entries(output).reduce(
                    (acc, [k, v]) => v.js ? ({ [k]: v.js, ...acc }) : acc, {}
                );
                
                scripts['webpack-dev-server'] = {
                    js: '/webpack-dev-server.js',
                    scriptSpecies: 'defer',
                };
                
                console.log("js map path:", path.join(__dirname, "../../dist/dev/conf"))
                console.log("js assets:", scripts);
                return `${JSON.stringify(scripts, null, 2)}`;
            }
        }),
        new AssetsPlugin({
            path: path.join(__dirname, "../../dist/dev/conf"),
            filename: 'assets.css.json',
            processOutput: function (x) {
                const styles: any = {};

                for (let key in x) {
                    if (!!key && !!x[key].css) {
                        styles[key] = filterFileName(x[key].css);
                    }
                }
                console.log("css map path:", path.join(__dirname, "../../dist/dev/conf"))
                console.log("css assets:", styles)
                return `${JSON.stringify(styles, null, 2)}`;
            }
        }),
    ],
    mode: "development",
    watch: true,
    watchOptions: {
        aggregateTimeout: 3000,  //防抖 多少毫秒后再次触发
        ignored: /node_modules/ //忽略时时监听
    }
});

module.exports = config;

export default config

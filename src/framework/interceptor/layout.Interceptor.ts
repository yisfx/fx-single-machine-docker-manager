import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { SysConfig } from "../../conf/site.config";
let script = require("../../conf/assets.script")
let css = require("../../conf/assets.css")
import metadata from "../decorators/constants";
import reactView from "../template/ReactView";

@Injectable()
export class LayoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const route = Reflect.getMetadata(metadata.Route_Name_Metadata, context.getHandler());
        let scriptList: string[] = [script[route], script["vendor"]].filter(a => !!a)

        if (!scriptList)
            scriptList = [script[404]];


        let cssFile: string[] = css && [css[route], css["vendor"]].filter(a => !!a);


        const initalData = next.handle();

        const response = context.switchToHttp().getResponse();
        if (!route) {
            response.header("content-type", "text/json; charset=utf-8")
            return initalData
        }

        const html = reactView({
            css: cssFile.map(d => SysConfig.VisualStaticPath + "/" + d),
            initData: initalData,
            script: scriptList.map(d => SysConfig.VisualStaticPath + "/" + d),
            response
        })
        response.header("content-type", "text/html; charset=utf-8")
        html.subscribe(content => response.send(content));
        return html
    }
}
import { RouteConfig, Route, PageName } from "./route.config";
import {SysConfig} from "../conf/site.config";




export function urlBuilder(page: string, restfulRoute: string = null, para?: {}): string {
    let config: Route = RouteConfig[page];
    let url = null
    if (!!restfulRoute)
        url = SysConfig.domain + config.route.replace(":route", restfulRoute)
    else
        url = SysConfig.domain + config.route
    if (!!para) {
        url += "?"
        for (let key in para) {
            url += key + "=" + para[key]
        }
    }

    return url
}
import { Controller, UseGuards, UseInterceptors, Get } from "@nestjs/common";
import { RouteConfig } from "../../framework/route.config";
import { RouteRender } from "../../framework/decorators/RouteRender.decorator";
import { LoginGuard } from "../../framework/guards/login.guard";
import { LayoutInterceptor } from "../../framework/interceptor/layout.Interceptor";
import process from "child_process";


@Controller()
@UseInterceptors(LayoutInterceptor)
// @UseGuards(LoginGuard)
export class ManageController {
    constructor() {

    }

    @Get(RouteConfig.Manage.route)
    @RouteRender(RouteConfig.Manage.name)
    async Manage() {
        var containerList = process.execSync("docker ps -a").toString();
        return { initData: { containerList } }
    }
}

import { Controller, UseGuards, UseInterceptors, Get } from "@nestjs/common";
import { RouteConfig } from "../../framework/route.config";
import { RouteRender } from "../../framework/decorators/RouteRender.decorator";
import { LoginGuard } from "../../framework/guards/login.guard";
import { LayoutInterceptor } from "../../framework/interceptor/layout.Interceptor";
import process from "child_process";
import { Container } from "src/model/container";


@Controller()
@UseInterceptors(LayoutInterceptor)
// @UseGuards(LoginGuard)
export class ManageController {
    constructor() {

    }


    GetContainerList(): Container[] {
        var containerList = process.execSync("docker ps -a").toString();
        const lines = containerList.split('\n').filter(l => !!l.trim()).filter((l, index) => index != 0)
        let result = []
        for (const line in lines) {
            const cell = lines[line].split("   ").filter(c => !!c.trim())
            let c = {}
            c["ContainerID"] = cell[0]
            c["Image"] = cell[1]
            c["Command"] = cell[2]
            c["Created"] = cell[3]
            c["Status"] = cell[4]

            c["Name"] = cell[cell.length - 1]
            result.push(c)
        }
        return result;
    }



    @Get(RouteConfig.Manage.route)
    @RouteRender(RouteConfig.Manage.name)
    async Manage() {
        const container = this.GetContainerList();


        return { initData: { container } }
    }
}

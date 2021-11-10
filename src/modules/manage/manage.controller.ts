import { Controller, UseGuards, UseInterceptors, Get, Res, Req, Post } from "@nestjs/common";
import process from "child_process";
import { DockerContainer, ContainerStatus, DockerImage } from "../../model/container";
import { FastifyReply } from "fastify";
import { FastifyRequestWithCookie } from "../../model/types/FastifyReqWithCookie";
import { LayoutInterceptor } from "../../framework/interceptor/layout.Interceptor";
import { RouteConfig } from "../../framework/route.config";
import { RouteRender } from "../../framework/decorators/RouteRender.decorator";
import { OperateContainerRequest } from "../../model/request/containeroperate.request";
import { BaseResponse } from "../../model/response/baseResponse";
import { InspectResponse } from "../../model/response/inspectImage.response"
import { ServiceArgRequest } from "../../model/request/servicearg.request";

@Controller()
@UseInterceptors(LayoutInterceptor)
// @UseGuards(LoginGuard)
export class ManageController {
    constructor() {

    }


    GetContainerList(): DockerContainer[] {
        var containerList = process.execSync("docker ps -a").toString();
        const lines = containerList.split('\n').filter(l => !!l.trim()).filter((l, index) => index != 0)
        let result = []
        for (const line in lines) {
            const cell = lines[line].split("   ").filter(c => !!c.trim())
            let c = {}
            c["ContainerID"] = cell[0]?.trim()
            c["Image"] = cell[1]?.trim()
            c["Command"] = cell[2]?.trim()
            c["Created"] = cell[3]?.trim()
            c["Status"] = cell[4]?.trim()

            c["Name"] = cell[cell.length - 1]?.trim()
            result.push(c)
        }
        return result;
    }


    GetImages(): DockerImage[] {
        var containerList = process.execSync("docker images").toString();
        const lines = containerList.split('\n').filter(l => !!l.trim()).filter((l, index) => index != 0)
        let result = []
        for (const line in lines) {
            const cell = lines[line].split("   ").filter(c => !!c.trim())
            let i: any = {}
            i.Repository = cell[0]?.trim()
            i.Tag = cell[1]?.trim()
            i.ImageID = cell[2]?.trim()
            i.Created = cell[3]?.trim()
            i.Size = cell[4]?.trim()
            result.push(i)
        }
        return result;
    }



    @Get(RouteConfig.Manage.route)
    @RouteRender(RouteConfig.Manage.name)
    async Manage() {
        const container = this.GetContainerList();
        const images = this.GetImages()

        return { initData: { container, images } }
    }
    @Post("/ajax/api/StartContainer")
    async OpertaContainer(@Req() req: FastifyRequestWithCookie, @Res() res: FastifyReply) {
        const body = req.body as OperateContainerRequest;

        let response: BaseResponse = { Result: true, ErrorMessage: "" }

        if (body.Status == ContainerStatus.Run) {
            response.ErrorMessage = process.execSync(`docker start ${body.ContainerName}`).toString();
        }
        if (body.Status == ContainerStatus.Stop) {
            response.ErrorMessage = process.execSync(`docker stop ${body.ContainerName}`).toString();
        }
        if (body.Status == ContainerStatus.Delete) {
            response.ErrorMessage = process.execSync(`docker rm -f ${body.ContainerName}`).toString()
        }
        res.send(JSON.stringify(response));
    }

    @Post("/ajax/api/Inspect")
    async InspectImage(@Req() req: FastifyRequestWithCookie, @Res() res: FastifyReply) {
        const body = req.body as { ImageID: string }
        let response: InspectResponse = {
            Inspect: JSON.parse(process.execSync(`docker inspect ${body.ImageID}`).toString()),
            Result: true,
            ErrorMessage: ""
        };
        res.send(response)
    }

    @Post("/ajax/api/runserviceApi")
    async RunService(@Req() req: FastifyRequestWithCookie, @Res() res: FastifyReply) {
        let body = req.body as ServiceArgRequest

        let command = "docker run -d ";
        if (body.portA > 0 && body.portB > 0) {
            command += `-p ${body.portA}:${body.portB} `
        }
        if (body.volumeA && body.volumeB) {
            command += `-v ${body.volumeA}:${body.volumeB} `
        }
        if (body.ContainerName) {
            command += `--name=${body.ContainerName} `
        }

        command += `--net=host ${body.Image.Repository}:${body.Image.Tag}`

        console.log(command);

        const msg = process.execSync(command).toString();
        console.log(msg)


        res.send("")

    }

}

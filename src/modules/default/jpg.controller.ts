import { Controller, Get, Req, Res } from "@nestjs/common";
import { SysConfig } from "../../conf/site.config";
import fs from "fs";
import { FastifyRequest, FastifyReply } from "fastify";
import { ContentType } from "../../framework/types/contentType";
import { join } from "path";



@Controller()
export class JPGController {
    constructor(
    ) {

    }

    @Get(`${SysConfig.VisualStaticPath}/:file`)
    cssFile(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        let dir: string[] = req.url.split("/")
        let f = dir[dir.length - 1]
        let path: string
        if (req.url.endsWith(".css")) {
            res.header("content-type", ContentType.Css)
            path = SysConfig.CssPath;
        }
        else if (req.url.endsWith(".js")) {
            res.header("content-type", ContentType.Script)
            path = SysConfig.JsPath;
        }
        else
            path = SysConfig.ImagePath;
        res.header("cache-control", "max-age=946080000, public ");
        fs.readFile(join(__dirname, '../../', path, f), (err, fileBuffer) => {
            res.send(err || fileBuffer);
        });
    }
    @Get(`${SysConfig.VisualStaticPath}/image/:file`)
    staticImage(@Req() req: FastifyRequest, @Res() res: FastifyReply) {

        let dir: string[] = req.url.split("/")
        let f = dir[dir.length - 1]
        let path: string = SysConfig.ImagePath
        res.header("cache-control", "max-age=946080000, public ");
        fs.readFile(join(__dirname, '../../', path, f), (err, fileBuffer) => {
            res.send(err || fileBuffer)
        })
    }
    @Get(`${SysConfig.VisualStaticPath}/svg/:file`)
    staticSvg(@Req() req: FastifyRequest, @Res() res: FastifyReply) {

        let dir: string[] = req.url.split("/")
        let f = dir[dir.length - 1]
        let path: string = SysConfig.ImagePath
        res.header("cache-control", "max-age=946080000, public ");
        fs.readFile(join(__dirname, '../../', path, f), (err, fileBuffer) => {
            let ressss = "data:image/svg+xml;base64," + fileBuffer.toString("base64");
            res.send(err || ressss)
        })
    }


    @Get("favicon.ico")
    favicon(@Res() res: FastifyReply) {
        let path = SysConfig.ImagePath;
        res.header("content-type", "content-type: image/x-icon");
        res.header("cache-control", "max-age=946080000, public ");
        fs.readFile(join(__dirname, '../../', path, "snow.png"), (err, fileBuffer) => {
            res.send(err || fileBuffer)
        })
    }
}

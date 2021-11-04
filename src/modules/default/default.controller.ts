import { Controller, Req, Res, Post, Param } from "@nestjs/common";
import { FXCookie } from "../../framework/cookie/fxCookie";
import { useLoginTokenStorage } from "../../framework/cookie/logintoken.storage";
import { FastifyRequestWithCookie } from "../../model/types/FastifyReqWithCookie";
import { HttpClient } from "../../framework/httpclient/http.client";
import { BaseResponse } from "../../model/response/baseResponse";
import { ValidateLogin } from "../../framework/validate/loginValidate";
import { RestfulService } from "../../conf/restful.service";
import { FastifyReply } from "fastify";


@Controller()
export class DefaultController {
    constructor(private readonly httpClient: HttpClient) {

    }

    @Post("/ajax/api/:route")
    async ajaxPost(@Req() req, @Res() res: FastifyReply, @Param("route") route) {
        let restful = RestfulService[route]

        if (!restful || restful.ServiceOnly) {
            res.send(404);
            return
        }
        if (restful.NeedLogin) {
            let request: FastifyRequestWithCookie = req;
            let fxCookie = FXCookie(request);
            let token = useLoginTokenStorage(fxCookie).getToken()

            if (!token) {
                res.send(415);
                return
            }
            let authRes = await this.httpClient.createClient<BaseResponse>("loginAuthApi", {})
            if (!authRes?.Result) {
                res.send(415);
                return
            }

        }

        let response = await this.httpClient.createClient<BaseResponse>(route, req.body)
        res.send(response)
    }
}

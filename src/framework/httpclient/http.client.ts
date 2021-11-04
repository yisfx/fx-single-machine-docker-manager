import { Inject, Injectable, Req } from "@nestjs/common";
import { FastifyRequest } from "fastify";

import request from "request";
import { FastifyRequestWithCookie } from "../../model/types/FastifyReqWithCookie";
import { RestfulService, ServiceHost } from "../../conf/restful.service";
import { FXCookie } from "../cookie/fxCookie";
import { useLoginTokenStorage } from "../cookie/logintoken.storage";
import { REQUEST } from "@nestjs/core";


@Injectable()
export class HttpClient {
    constructor(
     @Inject(REQUEST) private readonly req: FastifyRequest
    ) {
    }


    public async get(url: string) {
        try {
            let a = await this.createClient(url)
            return a;
        } catch (ex) {
            return "a"
        }
    }



    public async createClient<T>(api: string, req: any = undefined): Promise<T> {
        let restful = RestfulService[api]
        if (!restful) {
            throw Error("error api:" + api)
        }
        let host = ServiceHost[restful.Service]
        if (!host) {
            throw Error("error service:" + restful.Service)
        }
        
        let uri: string
        if (!host.endsWith("/") && !restful.URL.endsWith("/")) {
            uri = host + "/" + restful.URL;
        } else {
            uri = host + restful.URL
        }

        let str = ""
        if (typeof (req) === "string") {
            str = req
        } else {
            str = JSON.stringify(req)
        }

        let cookie = FXCookie(this.req as FastifyRequestWithCookie)
        let loginToken = useLoginTokenStorage(cookie).getToken()

        // console.log("loginToken:",loginToken)
        // console.log("request header:", this.req["FXCookie"])
        
        var result = await new Promise<T>((resolve, reject) => {
            try {
                request(uri,
                    {
                        method: restful.Method,
                        timeout: 5000,
                        headers: {
                            "content-type": "application/json",
                            "Fx-Login-Token":loginToken
                        },
                        body: str
                    }, (err, response, body) => {

                        if (!!err) {
                            reject(err)
                        } else {
                            if (response.statusCode != 200) {
                                reject({ error: "service error", htttpStatus: response.statusCode })
                            }
                            try {
                                let resp = JSON.parse((body as string))
                                resolve(resp);
                            } catch (e) {
                                resolve(body)
                            }
                        }
                    })
            } catch (ex) {
                reject("service error")
            }
        })
        return result;

    }
}

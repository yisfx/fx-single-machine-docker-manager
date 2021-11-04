import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { BaseResponse } from "src/model/response/baseResponse";
import { FastifyRequestWithCookie } from "../../model/types/FastifyReqWithCookie";
import { FXCookie } from "../cookie/fxCookie";
import { useLoginTokenStorage } from "../cookie/logintoken.storage";
import { HttpClient } from "../httpclient/http.client";


@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private readonly httpClient:HttpClient){

    }


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let request: FastifyRequestWithCookie = context.switchToHttp().getRequest();
        let fxCookie = FXCookie(request);
        let token = useLoginTokenStorage(fxCookie).getToken()
        if (token) {
            return new Promise((resolve,reject)=>{
                this.httpClient.createClient<BaseResponse>("loginAuthApi",{}).then(resp=>{
                    resolve(resp.Result)
                })
            })
            
        }
        context.getHandler()
        return false;
    }

}
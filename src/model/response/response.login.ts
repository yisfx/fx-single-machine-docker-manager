import { BaseResponse } from "./baseResponse";


export interface LoginResponse extends BaseResponse {
    LoginToken: string
}
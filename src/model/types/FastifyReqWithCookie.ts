import { FastifyRequest } from "fastify";
import { FXCellCookie } from "../../framework/cookie/cellFXCookie";


export interface FastifyRequestWithCookie extends FastifyRequest {
    FXCookie: FXCellCookie[] 
}
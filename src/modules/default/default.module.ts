import { Module } from "@nestjs/common";
import { DefaultController } from "./default.controller";
import { HttpClient } from "../../framework/httpclient/http.client";
import { JPGController } from "./jpg.controller";
import { ExceptionController } from "./exception.controller";

@Module({
    imports: [],
    controllers: [
        DefaultController,
        JPGController,
        ExceptionController
    ],
    providers: [HttpClient],
})

export class DefaultModule { }
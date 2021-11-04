import { Module } from "@nestjs/common";
import { HttpClient } from "../../framework/httpclient/http.client";
import { ManageController } from "./manage.controller";

@Module({
    imports: [],
    controllers: [
        ManageController
    ],
    providers: [HttpClient],
})

export class ManageModule { }
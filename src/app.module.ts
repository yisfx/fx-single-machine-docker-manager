import { Module } from "@nestjs/common";
import { DefaultModule } from "./modules/default/default.module";
import { ManageModule } from "./modules/manage/manage.module";



@Module({
    imports: [
        DefaultModule,
        ManageModule
    ]
})


export class AppModule { }
import { Controller, Get, Res } from "@nestjs/common";

@Controller()
export class ExceptionController {
    constructor() {

    }

    @Get("404")
    async ajaxPost(@Res() res) {
        res.status(404).send("404")
    }
}

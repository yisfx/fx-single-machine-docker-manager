import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class CSPInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        let response = context.switchToHttp().getResponse();


        response.header("content-security-policy", "default-src 'self' data: https://cdn.bootcss.com/ https://cdn.jsdelivr.net/;script-src * 'unsafe-eval' 'unsafe-inline';img-src data: https://www.fxfxfxfx.cn/ https://fxfxfxfx.cn http://localhost:9000/;")

        return next.handle().pipe(
            tap(_ => { }),
        )
    }

}
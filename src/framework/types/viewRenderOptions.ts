import { Observable } from "rxjs";

export interface ViewRenderOption {
    initData: Observable<any>,
    cssLink: string[],
    scriptLink: string[]

}
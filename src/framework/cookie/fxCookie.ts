import { FastifyRequestWithCookie } from "../../model/types/FastifyReqWithCookie";
import { FXCellCookie } from "./cellFXCookie";
import { CookieMapping } from "./cookieName";



export let FXCookie = (req: FastifyRequestWithCookie) => {
    if (req.FXCookie) {
        return req.FXCookie
    }

    let cookieResult = req.headers.cookie?.split(";")
        .map(cookie => cookie.trim())
        .map(cookie => {
            let [key, value] = cookie.split("=");
            let cookieName = CookieMapping.find(x => x.key == key);
            if (cookieName)
                return new FXCellCookie(cookieName.Name, value);
        })
    req.FXCookie = cookieResult?.filter(x => !!x);
    return req.FXCookie;
}
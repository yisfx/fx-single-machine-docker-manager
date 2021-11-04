import { FXCellCookie } from "./cellFXCookie";
import { CookieName } from "./cookieName";


export function useLoginTokenStorage(cookie: FXCellCookie[]) {

    const currentCookie = cookie?.find(d => d.key == CookieName.OnlyIdentificationKey);

    return {
        getToken() {
            return currentCookie?.value
        }
    }

}
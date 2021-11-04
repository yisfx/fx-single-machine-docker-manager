

export type CookieOption = {
    path: string,
    expireAfter: number,
    secure: boolean,
    sameSite: "Strict" | "None" | "Lax";
    httpOnly: boolean
}

export type CookieType = {
    key: string
    session: boolean
    options: CookieOption
}


const _CookieConfig: { [s: string]: CookieType } = {
    OnlyIdentificationKey: {
        key: "fx%5OIK",
        session: true,
        options: {
            path: "/",
            expireAfter: 300000,
            secure: true,
            sameSite: "None",
            httpOnly: true
        }
    },
    DemoCookie: {
        key: "fx%5Demo",
        session: true,
        options: {
            path: "/",
            expireAfter: 0,
            secure: true,
            sameSite: "Lax",
            httpOnly: false
        }
    }
}


export let cookieConfig = _CookieConfig

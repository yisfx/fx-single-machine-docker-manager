import { cookieConfig, CookieType } from "../../conf/cookie";
import { expiresGMTString } from "./expiresGMTString";

export class FXCellCookie {
    key: string
    private _value: string
    private config: CookieType
    constructor(key: string, value: string) {
        this.key = key
        this._value = value
        this.config = cookieConfig[key];
    }

    private get domain() {
        return "";
    }
    private get path() {
        return this.config.options.path;
    }
    private get expires() {
        if (this.config.session)
            return "";
        return expiresGMTString(this.config.options.expireAfter);
    }
    private get secure() {
        return this.config.options.secure;
    }
    private get sameSite() {
        return this.config.options.sameSite;
    }
    
    private get httpOnly() {
        return this.config.options.httpOnly;
    }
    
    private get optionString() {
        let result = [];
        if (this.domain) result.push(`Domain=${this.domain}`);
        if (this.path) result.push(`Path=${this.path}`);
        if (this.expires) result.push(`Expires=${this.expires}`);
        if (this.httpOnly) result.push(`HttpOnly`);
        if (this.secure) result.push(`Secure`);
        if (this.sameSite) result.push(`SameSite=${this.sameSite}`);
        return result.join("; ");
    }

    get value() {
        return this._value;
    }

    get initialRawValue() {
        return `${this.config.key}=${this.value}; ${this.optionString}`;
    }
}

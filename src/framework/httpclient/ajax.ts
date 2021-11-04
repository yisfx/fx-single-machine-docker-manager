import { BaseResponse } from "../../model/response/baseResponse";

async function Ajax<T>(api: string, request: T): Promise<BaseResponse> {
    try {
        let resp: any = await fetch("/ajax/api/" + api, {
            body: JSON.stringify(request),
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                "accept": "application/json; charset=utf-8"
            },
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer'
        });
        return await new Promise((resolve, reject) => {
            if (resp.ok) {
                resolve(resp.json())
            } else {
                reject(resp.json())
            }
        })
    } catch (ex) {
        return { Result: false, ErrorMessage: ex }
    }
}

export { Ajax }
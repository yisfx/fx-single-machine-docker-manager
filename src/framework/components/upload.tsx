import React, { useEffect, useState } from "react";
import ReactRender from "fast-react-render";

class IProps {
    UploadUrl: string;
    Success: (response) => void
}
export function Upload(props: React.PropsWithChildren<IProps>) {

    const [submit, startSubmit] = useState(0)//0 :未提交，1：提交渲染form，2：返回结果
    const onSubmit = () => {
    }
    const form = () => {
        return <html>
            <body>
                <form action={props.UploadUrl} onSubmit={onSubmit} method="post" encType="multipart/form-data">
                    {props.children}
                </form>
            </body>
        </html>
    }

    useEffect(() => {
        if (submit != 1)
            return;
        let iframe = document?.getElementsByTagName("iframe")[0];


        setTimeout(() => {
            startSubmit(2)
            let form = iframe?.contentDocument?.getElementsByTagName("form")[0]
            form.submit();
        }, 3000);
    }, [submit])


    return < div >
        <iframe hidden={false}
            frameBorder={0}
            srcDoc={ReactRender.elementToString(React.createElement(form, props), { context: {} })}
            onLoad={(evt) => {
                if (submit == 2) {
                    let iframe = document?.getElementsByTagName("iframe")[0];
                    let response = iframe?.contentDocument?.getElementsByTagName("body")[0]
                        ?.getElementsByTagName("pre")[0]
                        ?.innerText;
                    startSubmit(0);
                    try {
                        iframe.srcdoc = ReactRender.elementToString(React.createElement(form, props), { context: {} });
                        props?.Success && props.Success(JSON.parse(response))
                    } catch {
                        props?.Success && props.Success(response)
                    }
                }
            }}>
        </iframe>
        <button onClick={() => { startSubmit(1) }}>submit</button>
        {/* } */}
    </div >
}



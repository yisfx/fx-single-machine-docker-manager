import React, { createElement, FC } from "react";
import { Observable } from "rxjs";
import { flatMap } from "rxjs/operators";
import { ViewRenderOption } from "../types/viewRenderOptions";
import { renderToNodeStream } from "react-dom/server";


declare let window: any

interface IProps {
    initData: any,
    cssLink: string[],
    scriptLink: string[]
}


function ViewRender(props: IProps) {
    let html: FC = () => <html lang="zh-CN">
        <head>
            <title>TRAVEL</title>
            {`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">`}
            {
                props.cssLink && props.cssLink.map(cssFile => `<link href='${cssFile}' rel='stylesheet'>`)
            }
        </head>
        <body>
            <script>
                {window.__reactData__ = JSON.stringify(props.initData)}
            </script>
            <div id="app">

            </div>
            {props.scriptLink && props.scriptLink.map(script => <script src={script}></script>)}
            <script src={"script"}></script>
            <script>

            </script>
            <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
            <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        </body>
    </html>
    return html;
}

function renderBuf(stream: NodeJS.ReadableStream, onEnd: (b: Buffer) => void, onError: (e: Error) => void) {

}


function Process(content: FC): Observable<Buffer> {
    let stream = renderToNodeStream(createElement(content));

    return new Observable<Buffer>(subscriber => {
        renderBuf(stream,
            buf => {
                subscriber.next(buf);
                subscriber.complete();
            },
            error => {
                subscriber.error(error);
            }
        );
    })
}


export default function reactView(
    viewOptions: ViewRenderOption
) {
    return viewOptions.initData.pipe(
        flatMap(data => Process(ViewRender({ initData: data, cssLink: viewOptions.cssLink, scriptLink: viewOptions.scriptLink }))),
    )
}
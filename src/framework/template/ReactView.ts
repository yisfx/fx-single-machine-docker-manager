import { Observable, pipe } from "rxjs";
import { flatMap, switchMap, tap } from "rxjs/operators";


interface Options {
    css: string[]
    initData: Observable<any>
    script: string[],
    response: any
}


const RenderHtml = (data: any, cssFile: string[], scriptFile: string[], response) => {
    let cssLink: string = ""
    let scriptLink: string = ""
    cssFile.forEach(d => cssLink += `<link href='${d}' rel='stylesheet'>`)
    scriptFile.forEach(d => scriptLink += `<script src='${d}'></script>`)

    const html = `<!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <title>TRAVEL</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        </head>
        <body>
        ${cssLink}
        <script>
            window.__reactData__=`+ JSON.stringify(data.initData) + `
        </script>
        <div id="app">
        </div>
        ${scriptLink}
            <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
            <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            </body>
        </html>`;
    response.send(html)
    return html
}


export default function reactView(
    viewOptions: Options
) {
    let ccc = viewOptions.initData.pipe(
        flatMap(data => RenderHtml(data, viewOptions.css, viewOptions.script, viewOptions.response)),
    )
    return ccc
}
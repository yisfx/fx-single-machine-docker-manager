import { SysConfig } from "../conf/site.config";



export function buildImageUrl(name: string, mix: boolean = false) {
    if (mix) {
        return `${SysConfig.VisualStaticPath}${SysConfig.MixPath}/album/${name}`;
    }
    return `${SysConfig.VisualStaticPath}/${name}`;
}

export function BuildAlbumImageUrl(name: string) {
    let u = `${SysConfig.VisualStaticPath}/album/${name}`;
    return u;
}
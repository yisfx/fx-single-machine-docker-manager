///相册
export class Album {
    Name: string
    CNName: string
    Cover: string
    Date: string
    Path: string
    PicList: Picture[]
    Description: string
    ///根据album name寻path
}

///图片
export interface Picture {
    Name: string
    MiniPath: string
    MaxPath: string
    OrgPath: string
    Album: string
}

export interface PictureUrlLink {
    Name: string
    Type: "max" | "mini"
    DateTime: number
    AlbumName: string
}
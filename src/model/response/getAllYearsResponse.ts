import { Album } from "../album";
import { BaseResponse } from "./baseResponse";

export interface GetAllYearsResponse extends BaseResponse {
    AllYears: YearAlbumList[]
}

export interface YearAlbumList {
    Year: number
    AlbumList: Album[]
}
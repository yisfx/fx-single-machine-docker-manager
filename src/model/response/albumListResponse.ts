import { Album } from "../album";
import { BaseResponse } from "./baseResponse";

export interface AlbumListResponse extends BaseResponse {
    AlbumList: Album[]
}
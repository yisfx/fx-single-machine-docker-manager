import { Album } from "../album";
import { BaseResponse } from "./baseResponse";

export interface GetAlbumResponse extends BaseResponse {
    Album: Album
}
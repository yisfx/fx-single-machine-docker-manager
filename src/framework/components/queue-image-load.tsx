import { FXImage, FXImageIProps } from "./fxImage"
import React, { useEffect, useState } from "react";

interface IProps extends FXImageIProps {
    currentPicName: string
}

enum PictureLoadStatus {
    Loading,
    Done,
}
export interface QePic {
    PicName: string,
    IsLoad: boolean
}



export function QeImage(props: IProps) {
    const [picStatus, setStatus] = useState(PictureLoadStatus.Loading)
    const LoadingName = "svg/ball-triangle.svg";
    const [picName, setName] = useState(LoadingName)
    useEffect(() => {
        if (props.currentPicName == props.name) {
            setName(props.name);
        } else {
            if (picStatus == PictureLoadStatus.Done) {
                setName(props.name);
            }
            if (picStatus == PictureLoadStatus.Loading) {
                setName(LoadingName);
            }
        }
    }, [props.currentPicName == props.name, picStatus])

    return <FXImage
        {...{ ...props, name: picName }}
        LoadEnd={(isSuccess) => {
            setStatus(PictureLoadStatus.Done);
            props.LoadEnd && props.LoadEnd(isSuccess);
        }}
    />
}

export function ConvertToQePic(PicList: string[]): QePic[] {
    if (!PicList || PicList.length < 1) {
        return null;
    }
    let result: QePic[] = PicList.map(d => { return { PicName: d, IsLoad: false } }).filter(d => !!d.PicName && d.PicName != "")
    return result;
}

export function PopupPic(PicList: QePic[], prePic: string): { next: string, curList: QePic[] } {
    if (!PicList || PicList.length < 1) {
        return null;
    }
    let newList = PicList.filter(d => d.PicName != prePic);
    let last = newList.filter(d => !d.IsLoad);

    if (!last || last.length < 1) {
        return {
            next: null,
            curList: [...newList, { PicName: prePic, IsLoad: true }]
        };;
    }

    return {
        next: last[0].PicName,
        curList: [...newList]
    };
}
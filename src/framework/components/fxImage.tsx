import React, { useEffect, useState } from "react"
import { BuildAlbumImageUrl, buildImageUrl } from "../imageBuild";

enum ImageType {
    Normal,
    Album,
    MixAlbum,
}
const loadingBase64 = "data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+DQo8IS0tIFRvZG86IGFkZCBlYXNpbmcgLS0+DQo8c3ZnIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0cm9rZT0iI2ZmZiI+DQogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlLXdpZHRoPSIyIj4NCiAgICAgICAgICAgIDxjaXJjbGUgY3g9IjUiIGN5PSI1MCIgcj0iMjUiIGZpbGw9IiM5MGZmZmYiPg0KICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5Ig0KICAgICAgICAgICAgICAgICAgICAgYmVnaW49IjBzIiBkdXI9IjIuMnMiDQogICAgICAgICAgICAgICAgICAgICB2YWx1ZXM9IjUwOzU7NTA7NTAiDQogICAgICAgICAgICAgICAgICAgICBjYWxjTW9kZT0ibGluZWFyIg0KICAgICAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+DQogICAgICAgICAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giDQogICAgICAgICAgICAgICAgICAgICBiZWdpbj0iMHMiIGR1cj0iMi4ycyINCiAgICAgICAgICAgICAgICAgICAgIHZhbHVlcz0iNTsyNzs0OTs1Ig0KICAgICAgICAgICAgICAgICAgICAgY2FsY01vZGU9ImxpbmVhciINCiAgICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KICAgICAgICAgICAgPC9jaXJjbGU+DQogICAgICAgICAgICA8Y2lyY2xlIGN4PSIyNyIgY3k9IjUiIHI9IjUiIGZpbGw9IiM5MGZmZmYiPg0KICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5Ig0KICAgICAgICAgICAgICAgICAgICAgYmVnaW49IjBzIiBkdXI9IjIuMnMiDQogICAgICAgICAgICAgICAgICAgICBmcm9tPSI1IiB0bz0iNSINCiAgICAgICAgICAgICAgICAgICAgIHZhbHVlcz0iNTs1MDs1MDs1Ig0KICAgICAgICAgICAgICAgICAgICAgY2FsY01vZGU9ImxpbmVhciINCiAgICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4Ig0KICAgICAgICAgICAgICAgICAgICAgYmVnaW49IjBzIiBkdXI9IjIuMnMiDQogICAgICAgICAgICAgICAgICAgICBmcm9tPSIyNyIgdG89IjI3Ig0KICAgICAgICAgICAgICAgICAgICAgdmFsdWVzPSIyNzs0OTs1OzI3Ig0KICAgICAgICAgICAgICAgICAgICAgY2FsY01vZGU9ImxpbmVhciINCiAgICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KICAgICAgICAgICAgPC9jaXJjbGU+DQogICAgICAgICAgICA8Y2lyY2xlIGN4PSI0OSIgY3k9IjUwIiByPSI1IiBmaWxsPSIjOTBmZmZmIj4NCiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSINCiAgICAgICAgICAgICAgICAgICAgIGJlZ2luPSIwcyIgZHVyPSIyLjJzIg0KICAgICAgICAgICAgICAgICAgICAgdmFsdWVzPSI1MDs1MDs1OzUwIg0KICAgICAgICAgICAgICAgICAgICAgY2FsY01vZGU9ImxpbmVhciINCiAgICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4Ig0KICAgICAgICAgICAgICAgICAgICAgZnJvbT0iNDkiIHRvPSI0OSINCiAgICAgICAgICAgICAgICAgICAgIGJlZ2luPSIwcyIgZHVyPSIyLjJzIg0KICAgICAgICAgICAgICAgICAgICAgdmFsdWVzPSI0OTs1OzI3OzQ5Ig0KICAgICAgICAgICAgICAgICAgICAgY2FsY01vZGU9ImxpbmVhciINCiAgICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KICAgICAgICAgICAgPC9jaXJjbGU+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4="
export interface FXImageIProps extends React.ComponentProps<"img"> {
    name: string,
    type: ImageType,
    desc: string,
    LoadEnd?: (isSuccess: boolean) => void
}
function FXImage(props: FXImageIProps) {
    const [error, setError] = useState(false);
    const [image, setImage] = useState("");
    const [preLoad, setPreLoad] = useState(true);
    useEffect(() => {
        if (error) {
            setImage(buildImageUrl("image/error.jpg"));
        } else {
            if (props.name.endsWith(".svg")) {
                setImage(buildImageUrl(props.name));
            } else
                switch (props.type) {
                    case ImageType.Album: setImage(BuildAlbumImageUrl(props.name) || ""); break;
                    case ImageType.Normal: setImage(buildImageUrl(props.name) || "");
                    case ImageType.MixAlbum: setImage(buildImageUrl(props.name, true) || ""); break
                }
        }
    }, [props.name, error])


    if (image.endsWith("svg") || props.name.endsWith("svg")) {
        return <>
            <img
                style={props.style}
                className={props.className}
                src={loadingBase64} alt={props.desc || ""} />
        </>
    } else
        return <>
            {preLoad &&
                <div hidden={true}>
                    <img
                        style={{ ...props.style, display: "" }}
                        className={props.className}
                        onError={() => {
                            setPreLoad(false);
                            setError(true)
                            props.LoadEnd && props.LoadEnd(false);
                        }}
                        onLoad={() => {
                            setPreLoad(false);
                        }}
                        src={image} alt={props.desc || ""} />
                </div>
            }
            <img
                style={props.style}
                className={props.className}
                onError={() => {
                    setError(true)
                    props.LoadEnd && props.LoadEnd(false);
                }}
                onLoad={() => {
                    props.LoadEnd && props.LoadEnd(true);
                }}
                src={preLoad ? loadingBase64 : image} alt={props.desc || ""} />
        </>
}

export { ImageType, FXImage }

import React, { useState } from "react"
import MasterPage from "../../../framework/master/@masterPage"
import Master from "../../../framework/master/master"
import { ContainerStatus, DockerImage } from "../../../model/container"
import { Ajax } from "../../../framework/httpclient/ajax"
import { ManageStore } from "../store/manage.store"
import { FXModal } from "../../../framework/components/modal/fxModal"
import { InspectResponse } from "../../../model/response/inspectImage.response"
import { InspectImageRequest } from "../../../model/request/inspectImage.request"
import { ServiceArgRequest } from "../../../model/request/servicearg.request";


function Container(props: ManageStore) {
    return <div className="table-responsive">
        <table className="table ">
            <thead>
                <tr>
                    <td>Container ID</td>
                    <td>Image</td>
                    <td>Command</td>
                    <td>Created</td>
                    <td>Status</td>
                    <td>Port</td>
                    <td>Name</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {props.container.map(c =>
                    <tr key={c.ContainerID}>
                        <td><label title={c.ContainerID}>{c.ContainerID}</label></td>
                        <td><label title={c.Image}>{c.Image}</label></td>
                        <td><label title={c.Command}>{c.Command}</label></td>
                        <td><label title={c.Created}>{c.Created}</label></td>
                        <td><label title={c.Status}>{c.Status}</label></td>
                        <td><label title={c.Port}>{c.Port}</label></td>
                        <td><label title={c.Name}>{c.Name}</label></td>
                        <td>
                            {c.Status.startsWith("Up") ?
                                <button onClick={() => {
                                    Ajax("StartContainer", { Status: ContainerStatus.Stop, ContainerName: c.Name }).then(res => {
                                        window.location.reload();
                                    })
                                }}>Stop</button>
                                :
                                <button onClick={() => {
                                    Ajax("StartContainer", { Status: ContainerStatus.Run, ContainerName: c.Name }).then(res => {
                                        window.location.reload();
                                    })
                                }}>Start</button>
                            }
                            <hr />
                            <button onClick={() => {
                                Ajax("StartContainer", { Status: ContainerStatus.Delete, ContainerName: c.Name }).then(res => {
                                    window.location.reload();
                                })
                            }}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}

function Images(props: ManageStore) {
    const [modalImage, SetModalImage] = useState(null as DockerImage)
    const [inspectImage, setInspect] = useState({ image: null as DockerImage, Inspect: {} })

    const [newImage, setNewImage] = useState({ show: false, Image: { Registory: "wangsaihaizai", ImageName: "", Tag: "v" } })

    const [args, setArgs] = useState({
        portA: 0,
        portB: 0,
        volumeA: "/home/ubuntu/application/album",
        volumeB: "/app/album",
        ContainerName: "",
    })

    const setPort = (port: string) => {
        const p = parseInt(port)
        if (p > 0 && p < 65535)
            return p
        return 0
    }

    return <>
        <button style={{ margin: "20px" }}
            onClick={() => {
                setNewImage({ ...newImage, show: !newImage.show })
            }}
        >Pull New Image</button>
        {newImage?.show && <div style={{ margin: "30px" }}>
            <input value={newImage?.Image?.Registory}
                onChange={(evt) => {
                    setNewImage({ ...newImage, Image: { ...newImage.Image, Registory: evt.target.value } })
                }}
            />/<input value={newImage?.Image?.ImageName}
                onChange={(evt) => {
                    setNewImage({ ...newImage, Image: { ...newImage.Image, ImageName: evt.target.value } })
                }}
            />:<input value={newImage?.Image?.Tag}
                onChange={(evt) => {
                    setNewImage({ ...newImage, Image: { ...newImage.Image, Tag: evt.target.value } })
                }}
            />
            <br />
            <button onClick={() => {
                Ajax("pullImageApi", { ImageName: `${newImage.Image.Registory}/${newImage.Image.ImageName}:${newImage.Image.Tag}` }).then((res: InspectResponse) => {
                    window.location.reload();
                })
            }}>Pull</button>
        </div>}
        <div className="table-responsive">
            <table className="table ">
                <thead>
                    <tr>
                        <td>Repository</td>
                        <td>Tag</td>
                        <td>ImageID</td>
                        <td>Created</td>
                        <td>Size</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {props.images?.map(i =>
                        <tr key={`${i.ImageID}-${i.Repository}-${i.Tag}`}>
                            <td><label title={i.Repository}>{i.Repository}</label></td>
                            <td><label title={i.Tag}>{i.Tag}</label></td>
                            <td><label title={i.ImageID}>{i.ImageID}</label></td>
                            <td><label title={i.Created}>{i.Created}</label></td>
                            <td><label title={i.Size}>{i.Size}</label></td>
                            <td>
                                {props.container.findIndex(c => c.Image == `${i.Repository}:${i.Tag}`) < 0 &&
                                    <>
                                        <button onClick={() => {
                                            SetModalImage(i);
                                            // show modal
                                        }}>Create a Container</button>
                                        <button style={{ marginLeft: "10px" }}
                                            onClick={() => {
                                                Ajax("deleteImageApi", { ImageName: `${i.Repository}:${i.Tag}` }).then((res: InspectResponse) => {
                                                    window.location.reload();
                                                })
                                            }}
                                        >Delete</button>
                                        <br />
                                    </>
                                }
                                <button onClick={() => {
                                    Ajax<InspectImageRequest>("Inspect", { ImageID: i.ImageID }).then((res: InspectResponse) => {
                                        setInspect({ image: i, Inspect: res.Inspect ?? res.ErrorMessage })
                                    })

                                }}>Inspect</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table >
            {
                !!modalImage &&
                <FXModal
                    isOpen={!!modalImage}
                    size={{ height: "70vh", width: "60wh", marginLeft: "40px", marginTop: "20px" }}
                    close={() => {
                        SetModalImage(null)
                        setArgs(null)
                    }}
                    showCloseBtn={true}
                    backDropClose={false}
                    OverScrollY={true}
                >
                    <div style={{ overflowX: "hidden" }}>
                        <h3 className="row">    Container Run Args</h3>
                        <pre>
                            <br />
                            <span>docker run -d</span><br />
                            {" -p "}<input
                                type="text"
                                maxLength={5}
                                width={600}
                                value={args?.portA}
                                onChange={(evt) => {
                                    setArgs({ ...args, portA: setPort(evt.target.value) })
                                }} />:<input
                                type="text"
                                width={600}
                                maxLength={5}
                                value={args?.portB}
                                onChange={(evt) => {
                                    setArgs({ ...args, portB: setPort(evt.target.value) })
                                }} />
                            <br />
                            {" -v "}
                            <input
                                type="text"
                                value={args?.volumeA}
                                onChange={(evt) => {
                                    setArgs({ ...args, volumeA: evt.target.value })
                                }} />:<input
                                type="text"
                                value={args?.volumeB}
                                onChange={(evt) => {
                                    setArgs({ ...args, volumeB: evt.target.value })
                                }} />
                            <br />
                            {" --name="}<input
                                type="text"
                                value={args?.ContainerName}
                                onChange={(evt) => {
                                    setArgs({ ...args, ContainerName: evt.target.value })
                                }} />
                            <br />
                            {` --net=host `}
                            <br />
                            {`${modalImage.Repository}:${modalImage.Tag}`}
                        </pre>
                        <button onClick={() => {
                            Ajax<ServiceArgRequest>("runserviceApi", { ...args, Image: modalImage }).then(res => {
                                window.location.reload()
                            })
                        }}> Run...</button>
                    </div>
                </FXModal>
            }
            {
                !!inspectImage?.image &&
                <FXModal
                    isOpen={!!inspectImage?.image}
                    size={{ height: "70vh", width: "60wh", marginLeft: "40px", marginTop: "10px" }}
                    close={() => {
                        setInspect(null)
                    }}
                    showCloseBtn={true}
                    backDropClose={false}
                    OverScrollY={true}
                >
                    <div style={{ overflowX: "hidden" }}>
                        <h4 className="row">{`    ${inspectImage.image.Repository}:${inspectImage.image.Tag} Inspect`}</h4>
                        <pre>
                            {JSON.stringify(inspectImage.Inspect, null, 2)}
                        </pre>
                    </div>
                </FXModal>
            }
        </div >
    </>
}

function Content(props: ManageStore) {
    const [curShow, setCur] = useState(1)


    return <div className="container">
        <div className="row">
            <div>
                <button onClick={() => {
                    setCur(curShow == 1 ? 2 : 1)
                }}>{curShow == 1 ? "To Image" : "To Container"}</button>
            </div>
            <hr />

            {curShow == 1 && <Container {...props} />}
            {curShow == 2 && <Images {...props} />}
        </div>
    </div>
}


require("../../../../static/css/manage.css")

@MasterPage(Master)
export default class Manage extends React.Component<ManageStore, any>{
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <Content {...this.props} />
        </div>
    }
}
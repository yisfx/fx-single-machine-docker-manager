import React, { useState } from "react"
import MasterPage from "../../../framework/master/@masterPage"
import Master from "../../../framework/master/master"
import { ContainerStatus, Image } from "../../../model/container"
import { Ajax } from "../../../framework/httpclient/ajax"
import { ManageStore } from "../store/manage.store"



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
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}

function Images(props: { Images: Image[] }) {
    return <div className="table-responsive">
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
                {props.Images.map(c =>
                    <tr key={c.ImageID}>
                        <td><label title={c.Repository}>{c.Repository}</label></td>
                        <td><label title={c.Tag}>{c.Tag}</label></td>
                        <td><label title={c.ImageID}>{c.ImageID}</label></td>
                        <td><label title={c.Created}>{c.Created}</label></td>
                        <td><label title={c.Size}>{c.Size}</label></td>
                        <td>
                            <button onClick={() => {
                                // show modal
                            }}>Create a Container</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
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
            {curShow == 2 && <Images Images={props.images} />}
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
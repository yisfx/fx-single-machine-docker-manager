import React from "react";
import { urlBuilder } from "../urlBuilder";
import { PageNameList } from "../route.config";


export default class AdminMaster extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            {/* <a className="navbar-brand" href={urlBuilder(PageNameList.AdminAlbum)}>FX</a> */}
                        </div>
                        <div id="navbar" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                {/* <li className="active"><a href={urlBuilder(PageNameList.AdminAlbum)}>AlbumList</a></li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container" style={{ marginTop: "50px" }}>
                    {this.props.children}
                </div>
            </div>
        )
    }


}
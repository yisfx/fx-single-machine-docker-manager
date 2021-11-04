import React from "react"
import MasterPage from "../../../framework/master/@masterPage"
import Master from "../../../framework/master/master"



function Container() {
    return <div className="container">
        <div className="row">

        </div>
    </div>
}



require("../../../../static/css/manage.css")

@MasterPage(Master)
export default class Manage extends React.Component<any, any>{
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <a>zheshisha</a>
            {/* <Content {...this.props} /> */}
        </div>
    }
}
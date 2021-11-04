import { render } from "react-dom";
import React from "react";
import Manage from "../views/manage.view";



export class ManagePage extends React.Component<any>{
    render() {
        return <Manage {...(this.props as any)} />;
    }
}

let readtData = window["__reactData__"]

render(
    <ManagePage {...readtData} />,
    document.getElementById("app")
)



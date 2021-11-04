
import React from "react";

const MasterPage: any = (master, props = {}) => (child) => {
    class WrapperComponent extends child {
        render() {
            return React.createElement(master, { ...props, ...this.props }, React.createElement(child, this.props))
        }
    }

    return WrapperComponent
}


export default MasterPage 
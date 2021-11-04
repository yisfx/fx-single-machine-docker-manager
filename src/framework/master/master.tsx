import React, { useState } from "react";

declare const jQuery
export default class Master extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <div className="">
                    {this.props.children}
                </div>
                {/* <div style={{ position: "absolute", bottom: "20px", right: "10px", zIndex: 999 }}>
                    <div data-tip="false" hidden
                        style={{
                            position: "absolute",
                            backgroundColor: "#DCDCDC",
                            bottom: "5px",
                            right: "20px",
                            padding: "5px"
                        }}
                        onClick={() => {
                            window.open("http://beian.miit.gov.cn/")
                        }}>
                        互联网ICP备案：<br />豫ICP备20015772号
                    </div>
                    <div
                        style={{ position: "absolute", right: "10px" }}
                        onClick={() => {
                            if (jQuery("[data-tip]").attr("data-tip") == "true") {
                                jQuery("[data-tip]").hide()
                                jQuery("[data-tip]").attr("data-tip", false)
                            } else {
                                jQuery("[data-tip]").show()
                                jQuery("[data-tip]").attr("data-tip", true)
                            }
                        }}>
                        <i className="glyphicon glyphicon-menu-up"></i>
                    </div>
                </div> */}
            </div>
        )
    }


}

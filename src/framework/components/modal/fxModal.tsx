import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";

// if (process.env.BROWSER) {
require('./modal.css')
// }

interface Props {
    size?: { width: string, height: string, marginLeft: string, marginTop: string }
    isOpen: boolean
    close?(): void
    attr?: React.HTMLAttributes<HTMLDivElement>
    showCloseBtn: boolean
    backDropClose?: boolean
    OverScrollY?: boolean
}

export const FXModal: FC<Props> = (props) => {
    const close = (p) => {
        p && document.body.removeChild(p);
        props.close && props.close();
    }

    if (props.isOpen) {
        return ReactDOM.createPortal(<>
            <div className="modal-container" onClick={() => {
                props.backDropClose && close(null)
            }}></div>
            <div style={props.OverScrollY && { overflowY: 'auto' }} className="fx-modal-content" onClick={(evt) => {
                //evt.preventDefault();
            }}
                {...props.attr}
            >
                {props.showCloseBtn &&
                    <i className="modal-close-btn glyphicon glyphicon-remove" onClick={() => { close(null) }}></i>
                }
                {props.children}
            </div>
        </>, document.body);
    } else {
        return <></>
    }
}
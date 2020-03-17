import React from 'react';
import ReactDom from 'react-dom';

import './style.css';

let msg = (props) => {
    let { sender, text } = props
    sender ? sender = sender : sender = 'Luke'
    //let position = sender === 'Luke' ? "botMessage" : "userMessage";
    let position = sender === 'Darth Vader' ? "userMessage" : "botMessage";
    return  (
    <div className={`d-flex flex-column msg ${position}`}>
        <strong>{ sender }</strong>
        <p>{ props.sender || (!props.sender && text) ? text : 'go away plz...' }</p>
    </div>
    )
}

export default msg
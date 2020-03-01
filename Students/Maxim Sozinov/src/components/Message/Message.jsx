
import React from 'react';
// import ReactDom from 'react-dom';

import './style.css';

let msg = (props) => {
    let { sender, text } = props;
    sender ? sender : sender = 'Bot';
    // text ? text = text : text = 'go away ...';
    let position = sender === 'Bot' ? "msgBot" : "msgAuthor";
    

    return  (
    <div className={`d-flex flex-column ${position}`}>
        <strong>{ sender }</strong>
        <p>{ props.sender || (!props.sender && text) ? text : 'go away plz...' }</p>
    </div>
    );

};

export default msg;
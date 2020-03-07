
import React from 'react';
// import ReactDom from 'react-dom';

import './style.css';

let msg = (props) => {
    let { sender, text, chatId } = props;
    sender ? sender : sender = 'Bot';
    // text ? text = text : text = 'go away ...';
    let position = sender === 'Bot' ? "msgBot" : "msgAuthor";
    let bgcolor = sender === 'Bot' ? `bgc${chatId}` : "bgcAuthor";

    return  (
    <div className={`d-flex flex-column ${position} ${bgcolor}`}>
        <p className="font-weight-bold">{ sender }</p>
        <p className="">{ props.sender || (!props.sender && text) ? text : 'go away plz...' }</p>
    </div>
    );

};

export default msg;
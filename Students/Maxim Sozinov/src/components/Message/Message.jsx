import React from 'react';

import './style.css';

const msg = (props) => {
    let { sender, text, chatId } = props;
    sender ? sender : sender = 'Bot';

    let position = sender === 'Bot' ? "msgBot" : "msgAuthor";
    let bgcolor = sender === 'Bot' ? `bgc${chatId}` : "bgcAuthor";

    return  (
    <div className={`d-flex flex-column ${position} ${bgcolor}`}>
        <p className="font-weight-bold">{ sender }</p>
        <p className="">{ text }</p>
    </div>
    );

};

export default msg;
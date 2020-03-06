import React from 'react';
import ReactDom from 'react-dom';

let msg = (props) => {
          console.log(props)

    let { sender, text } = props
    sender ? sender = sender : sender = 'Bot'
    text ? text = text : text = 'go away ...'
    return  (
    <div className={ "msg-item" + (sender !== 'Bot' ? "" : " msg-robot" ) }>
        <strong>{ sender }</strong>
        <p>{ text }</p>
    </div>
    )
}

export default msg
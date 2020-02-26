import React from 'react';
import ReactDOM from 'react-dom';
import './Message.css';

const Message = (props) => {
  const sender = props.msg.sender ? props.msg.sender : 'Bot';
  const text = props.msg.text ? props.msg.text : 'Bot answering smth...';
  return (
    <div className="msg">
        <strong>{ sender }</strong>
        <p>{ text }</p>
      </div>
  );
};

export default Message;
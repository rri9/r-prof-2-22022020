import React, {Component} from 'react';
import ReactDom from 'react-dom';

import './MessageField.css';
import Message from '../Message/Message.jsx';

class MessageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgs: props.msgs,
    };
  }
  sendMsg() { // sendMsg = () => {
    const msg = document.querySelector('#msg');
    this.setState({
      msgs : [...this.state.msgs, {
        sender: 'Me',
        text: msg.value,
      }],
    });
    msg.value = '';
  };
  render() {
    let MessagesArr = this.state.msgs.map((msg, index) => <Message key={index.toString()} msg={msg}/>);
    return (
      <div className="wrapper">
        <h2>ReactGram &copy;</h2>
        <div className="sendMsgField">
          <input type="text" name="msg" id="msg" placeholder="Введите сообщение" />
          <button type="button" name="sendMsg" onClick={ this.sendMsg.bind(this) }>
            Отправить
          </button>
        </div>
        { MessagesArr }
      </div>
    );
  }
}

export default MessageField;
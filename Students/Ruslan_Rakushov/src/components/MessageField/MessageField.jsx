import React, {Component} from 'react';
import ReactDom from 'react-dom';

import './MessageField.css';
import Message from '../Message/Message.jsx';

class MessageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgText: '',
      msgs: props.msgs,
    };
  }
  //methods
  sendMsg = () => {
    // const msg = document.querySelector('#msg'); //Так плохо, потому что не логично обращаться к DOM напрямую!!!
    this.setState ({
      msgs : [...this.state.msgs, {
        sender: 'Me',
        text: this.state.msgText,
      }],
      msgText: '',
    });
  };
  handleChange = (evt) => {
    if (evt.keyCode !== 13) {
      this.setState({ msgText: evt.target.value });
    } else {
      this.sendMsg();
    }
  };

  //hooks
  componentDidUpdate() {
    //Отвечаем на каждое нечетное сообщение через 1 сек
    if(this.state.msgs.length %2 === 1) {
      setTimeout(() => {
        this.setState({
          msgs: [...this.state.msgs, {
            sender: null,
            text: 'Leave me alone, human...',
          }]
        });
      }, 100);
    }
  }

  render() {
    let MessagesArr = this.state.msgs.map((msg, index) => <Message key={index.toString()} msg={msg}/>);
    return (
      <div className="wrapper">
        <h2>ReactGram &copy;</h2>
        <div className="sendMsgField">
          <input type="text" name="msg" id="msg" placeholder="Введите сообщение"
            onChange={this.handleChange}
            onKeyUp = {this.handleChange}
            value = {this.state.msgText}
          />
          <button type="button" name="sendMsg" onClick={ this.sendMsg }>
            Отправить
          </button>
        </div>
        { MessagesArr }
      </div>
    );
  }
}

export default MessageField;
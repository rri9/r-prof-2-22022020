import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx'

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages : [
        { 
          user: "Darth Vader", text: "Hello, Luke!" 
        },
        { 
          user: null, text: null 
        },
        { 
          user: "Darth Vader", text: "I am your father" 
        },
        { 
          user: null, text: "NOOOOOOOOO" 
        }
      ],
      homeWorkText : {
        user: null, text: "Нормально!"
      }
    };
  };
  render() {
    let { usr } = this.props;
    let MessagesArr = this.state.messages.map(message => (
      <Message sender={message.user} text={message.text}/>
    ));

    return (
      <div className="wrapper">
        <h2>ReactGram &copy;</h2>
        <p>Hello {usr}!</p>
        {MessagesArr}
        <div>
          <button onClick={() => {
                    this.setState({
                      messages: [...this.state.messages, this.state.homeWorkText]
                    });
                  }}>Новое сообщение!
          </button>
        </div>
      </div>
    );
  }
}
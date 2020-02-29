import React, { Component } from "react";
import ReactDom from "react-dom";

import Message from "../Message/Message.jsx";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.messages = [
      { user: "Darth Vader", text: "Hello, Luke!" },
      { user: null, text: null },
      { user: "Darth Vader", text: "I am your father" },
      { user: null, text: "NOOOOOOOOO" }
    ];
  }

  render() {
    let { usr } = this.props;
    let MessagesArr = this.state.messages.map(message => (
      <Message sender={message.user} text={message.text} />
    ));

    return (
      <div className="wrapper">
        <h2>ReactGram &copy;</h2>
        <p>Hello {usr}!</p>
        {MessagesArr}

        <div className="d-flex flex-column inputMessage">
          <button
            className="messages"
            onClick={() => {
              this.setState({
                messages: [
                  ...this.state.messages,
                  { user: null, text: "Нормально!" }
                ]
              });
            }}
          >
            Добавить сообщение!
          </button>
        </div>
      </div>
    );
  }
}
// onClick = {() => {
//     this.setState({
//         messages: [...this.state.messages, { user: null, text: null }]
//     });
//     console.log(this.state);
// }}

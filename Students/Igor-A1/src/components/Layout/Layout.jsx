import React, { Component } from 'react';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";

import ChatsHead      from '../ChatsHead/ChatsHead.jsx';
import ChatsList      from '../ChatsList/ChatsList.jsx';

import MessagesHead   from '../MessagesHead/MessagesHead.jsx';
import MessagesField  from '../MessagesField/MessagesField.jsx';
import { sendMessage } from "../../store/actions/messages_actions";

let user = 'Я';

class Layout extends Component {
  static propTypes = {
    chatId: PropTypes.number,
    sendMessage: PropTypes.func.isRequired ,
  };
  
  static defaultProps = {
    chatId: 1,
  };
  
  componentDidUpdate (prevProps , prevState) {
    const { messages } = this.state;
    if(
      Object.keys(prevState.messages).length < Object.keys(messages).length
        &&
      Object.values(messages)[Object.values(messages).length - 1].sender === user
      ) {
        setTimeout (() =>
          this.sendMessage('Не приставай ко мне, я робот!', 'bot'), 1000);
    };
  };

  sendMessage = (message, sender) => {
    const { messages } = this.state;
    const { chatId } = this.props;
    const messageId = Object.keys(messages).length + 1;
    this.setState({
      messages: {... messages ,
        [messageId]: {
          text: message,
          sender: sender
        }
      },
    }) ;
    this.props.sendMessage(messageId, message, sender, chatId);
  };

  render () {
      return (
        <div className="grid">
          <div className="chats">
              <ChatsHead />
              <ChatsList 
                chatId={ this.props.chatId }
              />
          </div>
          
          <div className="msgs">
              <MessagesHead 
                className="msgs-head"
                chatId={ this.props.chatId }
              />
              <MessagesField
                user={ user }
                chatId={ this.props.chatId }
              />
          </div>
        </div>
      )
  };
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => 
  bindActionCreators({ sendMessage }, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)
  (Layout);
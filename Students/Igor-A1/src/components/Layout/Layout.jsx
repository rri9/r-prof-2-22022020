import React, { Component } from 'react';
import PropTypes from "prop-types";
// import { bindActionCreators } from "redux";
// import connect from "react-redux/es/connect/connect";

import ChatsHead      from '../ChatsHead/ChatsHead.jsx';
import ChatsList      from '../ChatsList/ChatsList.jsx';

import MessagesHead   from '../MessagesHead/MessagesHead.jsx';
import MessagesField  from '../MessagesField/MessagesField.jsx';
//import { sendMessage } from "../../store/actions/messages_actions";

class Layout extends Component {
  static propTypes = {
    chatId: PropTypes.number,
    //sendMessage: PropTypes.func.isRequired ,
  };
  
  static defaultProps = {
    chatId: 1,
  };
  
  // sendMessage = (sender, text) => {
    // const { msgs } = this.state;
    // const { chatId } = this.props;
    // const msgId = Object.keys(msgs).length + 1;
    // this.setState({
      // msgs: {... msgs,
        // [msgId]: {
          // text: text,
          // sender: sender
        // }
      // },
    // }) ;
    // this.props.sendMessage(chatId, msgId, sender, text);
  // };

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
                chatId={ this.props.chatId }
                //msgs={ this.state.msgArray }
                //sendMessage={ this.sendMessage }
              />
          </div>
        </div>
      )
  };
};

// const mapStateToProps = ({ chatsReducer }) => ({
  // chats: chatsReducer.chats
// });

// const mapDispatchToProps = dispatch => 
  // bindActionCreators({ sendMessage }, dispatch);
  
// export default connect(mapStateToProps, mapDispatchToProps)
  // (Layout);
  
export default Layout;
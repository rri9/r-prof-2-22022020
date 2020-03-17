import React from 'react';

import Messages from '../MessagesField/MessagesField.jsx';
import ChatList from '../ChatList/ChatList.jsx';

export default class Layout extends React.Component {

   render() {
      const chatId = Number(this.props.match.params.chatId) || 1;

      return (
         <div className="d-flex align-items-end h-75 flex-grow-1">
            <ChatList chatId={chatId} />
            <Messages chatId={chatId} />
         </div>
      );
   }
}
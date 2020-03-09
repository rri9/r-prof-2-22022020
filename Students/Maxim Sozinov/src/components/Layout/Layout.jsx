import React from 'react';
import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom';

// import { Row, ListGroup, Button, } from 'react-bootstrap';

import Messages from '../MessagesField/MessagesField.jsx';
import ChatList from '../ChatList/ChatList.jsx';


export default class Layout extends React.Component {
   static propTypes = { 
      chatId: PropTypes.number, 
   };
   static defaultProps = {
      chatId: 1
   }

   render() {
      let user = 'Darth Vader';
      const chatId = Number(this.props.match.params.chatId) || 1;

      return (
         <div className="d-flex align-items-end h-75 flex-grow-1">
            <ChatList usr={user} chatId={chatId} />
            <Messages usr={user} chatId={chatId} />
         </div>
      );
   }
}
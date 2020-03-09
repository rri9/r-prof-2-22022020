import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Form, Row, ListGroup } from 'react-bootstrap';
import './style.css';

import { addChat } from '../../store/actions/chats_action.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ChatList extends React.Component {

   addNewChat = () => {
      const { chats } = this.props;
      const chatId = Object.keys( chats ).length + 1;
      const title = `Chat ${chatId}`;

      this.props.addChat( chatId, title );
   }

   render() {

      const { usr } = this.props;
      const { chats } = this.props;
      const { chatId } = this.props;

      let chatsArray = [];

      Object.keys( chats ).forEach( key => {
         chatsArray.push(
            <Link to={ `/chat/${key}` } key={ key }>
               <ListGroup.Item
                   action
                   className={ chatId == key ? 'active' : '' }
               >
                  { chats[key].title }
               </ListGroup.Item>
            </Link>);
      });

      return (
         <div className="bg-light h-100 col-2 d-flex flex-column justify-content-between p-0">
            <div>
               <p>Hello {usr}!</p>
               <Button 
                  variant="outline-primary w-100 mb-5"
                  onClick={ this.addNewChat }
               >
                  New chat
               </Button>
               <ListGroup>
                  { chatsArray }
               </ListGroup>
            </div>
         <footer className="text-white bg-dark w-100 text-center">
            ReactGram &copy;
         </footer>
      </div>
      );
   }
}

const mapStateToProps = ({ chatsReducer }) => ({
   chats: chatsReducer.chats
});

const mapDispatchToProps = dispatch => bindActionCreators( { addChat }, dispatch );

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
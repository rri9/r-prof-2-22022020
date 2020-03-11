import React from 'react';

import { Link, Redirect } from 'react-router-dom';

import { Button, Form, ListGroup, InputGroup, } from 'react-bootstrap';
import './style.css';

import { addChat } from '../../store/actions/chats_action.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ChatList extends React.Component {

   state = {
      newChatTitle: ''
   }

   handleChange = (event) => {
      event.keyCode !== 13 ?
          this.setState({
            newChatTitle: event.target.value
          }) :
          this.addNewChat( this.state.newChatTitle );
  }

   addNewChat = ( title ) => {
      const { chats } = this.props;
      const chatId = Object.keys(chats).length + 1;
      if ( title !== '') {
         this.props.addChat(chatId, title);
      }
      this.setState({
         newChatTitle: ''
     });
   }

   render() {

      const { usr } = this.props;
      const { chats } = this.props;
      const { chatId } = this.props;

      let chatsArray = [];

      Object.keys(chats).forEach(key => {
         chatsArray.push(
            <Link to={`/chat/${key}`} key={key}>
               <ListGroup.Item
                  action
                  className={chatId == key ? 'active' : ''}
               >
                  {chats[key].title}
               </ListGroup.Item>
            </Link>);
      });

      return (
         <div className="bg-light h-100 col-2 d-flex flex-column justify-content-between p-0">
            <div>
               <p className="my-3 text-center font-weight-bold">Hello {usr}!</p>
               <InputGroup className="mb-5">
                  <Form.Control
                     placeholder="New chat"
                     className="border-primary"
                     onChange={ this.handleChange }
                     onKeyUp= { this.handleChange }
                     value = { this.state.newChatTitle }
                  />
                  <InputGroup.Append>
                     <Button 
                        variant="outline-primary"
                        className="font-weight-bold"
                        onClick={ () => this.addNewChat( this.state.newChatTitle ) }
                     >
                        +
                     </Button>
                  </InputGroup.Append>
               </InputGroup>

               <ListGroup>
                  {chatsArray}
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

const mapDispatchToProps = dispatch => bindActionCreators({ addChat }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
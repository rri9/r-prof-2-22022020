import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Form, Row, ListGroup } from 'react-bootstrap';
// import './style.css';

// import Message from '../Message/Message.jsx';

import { addChat } from '../../store/actions/chats_action.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ChatList extends React.Component {

   render() {
      return (
         <div className="bg-light h-100 col-2 d-flex flex-column justify-content-between p-0">
            <div>
               {/* <p>Hello {user}!</p> */}
               <Button variant="outline-primary w-100 mb-5">New chat</Button>
               <ListGroup>
                  <Link to="/chat/1">
                     <ListGroup.Item action>Chat 1</ListGroup.Item>
                  </Link>
                  <Link to="/chat/2">
                     <ListGroup.Item action>Chat 2</ListGroup.Item>
                  </Link>
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
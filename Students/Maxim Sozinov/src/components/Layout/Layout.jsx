import React from 'react';

import { Container, Row } from 'react-bootstrap';

import Messages from '../MessagesField/MessagesField.jsx';

export default class Layout extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      let user = 'Darth Vader';
      return (
         <Row className="align-items-end h-75 flex-grow-1">
            <div className="bg-light h-100 col-2 d-flex flex-column justify-content-between p-0">
               <div>
                  <p>Hello {user}!</p>
                  ChatList
          </div>
               <footer className="text-white bg-dark w-100 text-center">
                  ReactGram &copy;
          </footer>
            </div>
            <Messages usr={user} />
         </Row>
      );
   }
}
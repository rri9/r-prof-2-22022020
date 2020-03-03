import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
import { Container, Badge, Row, Col } from 'reactstrap';

import Messages from './components/MessagesField/MessagesField.jsx'
import Search from './components/Search/Search.jsx'
//import SendButton from './components/Button/Button.jsx';

let user = 'Darth Vader'

const HeadLogo = (props) => {
  console.log(props)
  let { logo } = props
  return (
    <Badge color="warning" className="headlogo">{ logo }</Badge>
  );
}

const Messenger = (props) => {
    return (
      <Container fluid="lg" className="messengerContainer">
        <Row className="rowHead">
            <Col sm="2"  md="2" lg="3"><HeadLogo logo = 'Reactgram'/></Col>
            <Col sm="7"  md="6" lg="6"><Search/></Col>
            <Col sm="3"  md="4" lg="3"></Col>
        </Row>
        <Messages usr={ user } />
      </Container>
    );
  }

ReactDom.render (
 <Messenger/>,
    document.getElementById('app')
);

export default HeadLogo;

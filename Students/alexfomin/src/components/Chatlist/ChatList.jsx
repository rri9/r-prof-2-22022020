import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { ListGroup, ListGroupItem  } from 'reactstrap';
import './style.css';

export default class Chatlist extends Component {
    constructor(props) {
        super(props)
        this.state = {        }
    }
    

    render() {
        return (
  <>
      <ListGroup className="chatlist">
        <ListGroupItem tag="a" href="#" action>Chat #1</ListGroupItem>
        <ListGroupItem tag="a" href="#" action>Chat #2</ListGroupItem>
        <ListGroupItem tag="a" href="#" action>Chat #3</ListGroupItem>
        <ListGroupItem tag="a" href="#" action>Chat #4</ListGroupItem>
        <ListGroupItem disabled tag="a" href="#" action>Chat #5</ListGroupItem>
      </ListGroup>
</>
        );
    }
}
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

import './style.css';


  export default class SendButton extends Component {
    constructor(props) {
      super(props)
      
  }

      states =  {user: "Darth", text: "Feel the Force!"}



    render() {
        return (
          <InputGroup>
          <Input />
          <InputGroupAddon addonType="append" >
            <Button color="secondary" onClick={() => {this.props.sendMessage(this.states.text, this.states.user)}}>Отправить</Button>
          </InputGroupAddon>
        </InputGroup>
        );
    }
}
// 
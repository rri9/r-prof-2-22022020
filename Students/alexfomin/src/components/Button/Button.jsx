import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

import './style.css';


//   export default class Button extends Component {

//         states = {user: "Darth", text: "Feel the Force!"}
  


//     render() {
//         return (
//             <button className="btn btn-primary" type="button" onClick={() => {this.props.sendMessage(this.states.text, this.states.user)}}>Запостить</button>
//         )
//     }
// }

const SendButton = (props) => {
    return (
      <div>
      <InputGroup>
        <Input />
        <InputGroupAddon addonType="append">
          <Button color="secondary">Отправить</Button>
        </InputGroupAddon>
      </InputGroup>
      </div>
    );
  };
  
  export default SendButton;
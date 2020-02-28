import React, {Component} from 'react';
import ReactDom from 'react-dom';

//import Message from '../Message/Message.jsx'
import './style.css';

// function Button(props) {
//     return <button className="btn btn-primary" type="button"> Запостить</button>;
//   }

//   export default Button


  export default class Button extends Component {

        states = {user: "Darth", text: "Feel the Force!"}
  


    render() {
        return (
            <button className="btn btn-primary" type="button" onClick={() => {this.props.sendMessage(this.states.text, this.states.user)}}>Запостить</button>
        )
    }
}

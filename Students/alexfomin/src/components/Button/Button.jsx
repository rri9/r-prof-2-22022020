import React, {Component} from 'react';
import ReactDom from 'react-dom';

//import Message from '../Message/Message.jsx'
import './style.css';

// function Button(props) {
//     return <button className="btn btn-primary" type="button"> Запостить</button>;
//   }

//   export default Button


  export default class Button extends Component {

        state = {user: "Darth", text: "Feel the Force!"}
  


    render() {
        return (
            <button className="btn btn-primary" type="button" onClick={() => {this.props.sendMessage(this.state.text, this.state.user)}}>Запостить</button>
        )
    }
}

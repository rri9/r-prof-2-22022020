import React from 'react';
import ReactDOM from 'react-dom';
import './Message.css';

export default class Message extends React.Component {
  constructor(props) {
    console.log(props);
    
    props.sender ? (this.sender = props.sender) : (this.sender = 'Bot');
    props.text ? (this.text = props.text) : (this.text = 'Bot speaking...');
  }
  render() {
    return (
      <div className="msg">
        <strong>{ this.sender }</strong>
        <p>{ this.text }</p>
      </div>
    );
  }
}

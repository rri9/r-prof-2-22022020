import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class Message extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { sender, text } = this.props;
        sender ? sender = sender : sender = 'Bot';
        text ? text = text : text = 'go away';
        return (
        <div className="d-flex flex-column msg">
            <strong>{sender}</strong>
            <p>{text}</p>
        </div>
        )
    }
}
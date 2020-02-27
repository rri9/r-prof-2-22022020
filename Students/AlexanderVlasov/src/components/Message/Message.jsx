import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './style.css';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.sender = this.props.sender ? this.props.sender : 'Bot'
        this.text = this.props.text ? this.props.text : 'go away';
    }
    render() {
        return (
        <div className="d-flex flex-column msg">
            <strong>{this.sender}</strong>
            <p>{this.text}</p>
        </div>
        )
    }
}
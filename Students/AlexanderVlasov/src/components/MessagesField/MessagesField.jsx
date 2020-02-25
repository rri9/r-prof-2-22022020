import React, {Component } from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx';

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    user: 'Alex',
                    text: 'hello'
                },
                {
                    user: null,
                    text: null
                },
                {
                    user: 'Anna',
                    text: 'Hi'
                },
                {
                    user: null,
                    text: null
                }
            ],
            name: '',
            text: ''
        }
        this.handleChanges = this.handleChanges.bind(this);
    }

    handleChanges(event) {
        this.setState({...this.state, [event.target.name]: event.target.value});
    }

    newMessage() {
        const newMessages = this.state.messages.slice();
        newMessages.push({user: this.state.name, text: this.state.text});
        this.setState({messages: newMessages});
    }

    render() {
        const renderMessages = this.state.messages.slice().map((obj, index) => {
            return <Message key={index} sender={obj.user} text={obj.text}/>
        })
        return (
            <div className="wrapper">
                <h2>ReactGram &copy;</h2>
                <input type="text" value={this.state.name} placeholder="user" name="name" onChange={this.handleChanges}/>
                <input type="text" value={this.state.text} placeholder="text" name="text" onChange={this.handleChanges}/>
                <button onClick={() => this.newMessage()}>Send Message</button>
                {renderMessages}
            </div>
        )
    }
}
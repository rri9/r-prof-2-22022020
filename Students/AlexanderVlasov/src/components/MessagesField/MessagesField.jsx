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

    handleChanges(event, value) {
        const newObj = {};
        newObj[value] = event.target.value;
        this.setState(Object.assign({}, this.state, newObj));
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
                <input type="text" value={this.state.name} placeholder="user" onChange={(event) => this.handleChanges(event, 'name')}/>
                <input type="text" value={this.state.text} placeholder="text" onChange={(event) => this.handleChanges(event, 'text')}/>
                <button onClick={() => this.newMessage()}>Send Message</button>
                {renderMessages}
            </div>
        )
    }
}
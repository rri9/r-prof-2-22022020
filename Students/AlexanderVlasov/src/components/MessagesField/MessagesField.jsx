import React, {Component } from 'react';
import ReactDom from 'react-dom';
import './style.css';

import Message from '../Message/Message.jsx';

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.user = props.usr;
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
            msg: ''
        }
    }

    handleChanges = (event) => {
        event.keyCode !== 13 ?
            this.setState({msg: event.target.value}) :
            this.newMessage();
    }

    componentDidUpdate() {
        const msgs = this.state.messages;
        if (msgs.length % 2 === 1) {
            setTimeout(() => {
                this.setState(
                    {
                        messages: [...this.state.messages, {user: null, text: 'NOOOOOOOOO'}]
                    }
                );
            }, 500);
        }
    }

    newMessage = () => {
        this.setState(
            {
                messages: [...this.state.messages, {user: this.user, text: this.state.msg}],
                msg: ''
            }
        );
    }

    render() {
        const renderMessages = this.state.messages.slice().map((obj, index) => {
            return <Message key={index} sender={obj.user} text={obj.text}/>
        })
        return (
            <div className="wrapper">
                <h2>ReactGram &copy;</h2>
                {renderMessages}
                <input type="text" value={this.state.msg} placeholder="text" name="text" onChange={this.handleChanges} onKeyUp={this.handleChanges}/>
                <button onClick={() => this.newMessage()}>Send Message</button>
            </div>
        )
    }
}
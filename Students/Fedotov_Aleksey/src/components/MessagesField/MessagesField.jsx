import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx'

export default class Messages extends Component {
    constructor(props) {
        super(props)
        //где-то тут...
        this.state = {
            msgArray: [{
                    user: 'Darth Vader',
                    text: 'Hallo'
                },
                {
                    user: null,
                    text: null
                },
                {
                    user: 'Darth Vader',
                    text: 'I am your father'
                },
                {
                    user: null,
                    text: 'NOOOOOOOOO'
                }]
        },
        this.addFixMessageHandle = this.addFixMessageHandle.bind(this)
    }

    addFixMessageHandle(e) {
        e.preventDefault();
        let msgArr =  this.state.msgArray;
        msgArr.push({
            user: 'Bot',
            text: 'It\'s my first react app'
        });
        this.setState({msgArray: msgArr});
    }

    render() {
        //let user = this.props.usr
        let { usr } = this.props

        let MessagesArr = this.state.msgArray.map(message => <Message sender={ message.user } text={ message.text }/>)

        return (
            <div className="wrapper">
                <h2>ReactGram &copy;</h2>
                <p>Hello { usr }!</p>
                <button onClick = {this.addFixMessageHandle}>add fixMessage</button>
                { MessagesArr }
            </div>
        )
    }
}
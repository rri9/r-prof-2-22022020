import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx';

export default class Messages extends Component {
    constructor(props) {
        super(props);
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
        };
        this.addNewMessage = this.addNewMessage.bind(this);
    }

    addNewMessage () {
        this.setState({
            msgArray: this.state.msgArray.concat({user: 'Darth Vader', text: 'Normal'})
        })
    }

    render() {
        //let user = this.props.usr
        let { usr } = this.props;

        let MessagesArr = this.state.msgArray.map(message => <Message sender={ message.user } text={ message.text }/>)

        return (
            <div className="wrapper">
                <h2>ReactGram &copy;</h2>
                <p>Hello { usr }!</p>
                <button className="btn btn-primary" onClick={this.addNewMessage}>Send Message</button>
                { MessagesArr }
            </div>
        )
    }
}
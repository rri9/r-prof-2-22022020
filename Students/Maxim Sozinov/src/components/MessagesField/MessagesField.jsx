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
            }],

            newMessage: ''
        };

        this.addNewMessage = this.addNewMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addNewMessage () {
        this.setState({
            msgArray: this.state.msgArray.concat({user: 'Darth Vader', text: this.state.newMessage})
        });
    }

    handleChange (event) {
        this.setState({
            newMessage: event.target.value
        });
    }

    render() {
        //let user = this.props.usr
        let { usr } = this.props;
        
/* jshint ignore:start */
        let MessagesArr = this.state.msgArray.map(message => <Message sender={ message.user } text={ message.text }/>)

        return (
            <div className="wrapper">
                <h2>ReactGram &copy;</h2>
                <p>Hello { usr }!</p>
                <textarea className="d-block m-2" onChange={ this.handleChange } value = { this.state.newMessage } rows="3" cols="40" />
                <button className="btn btn-primary mx-2 mb-4" onClick={ this.addNewMessage }>Send Message</button>
                { MessagesArr }
            </div>
        )
/* jshint ignore:end */
    }
}
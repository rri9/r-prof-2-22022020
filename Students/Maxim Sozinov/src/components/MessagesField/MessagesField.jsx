import React, {Component} from 'react';
import { Button, Form, Row } from 'react-bootstrap';

// import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx';

export default class Messages extends Component {
    constructor(props) {
        super(props);
    }
    state = {
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
/* jshint ignore:start */
    addNewMessage = () => {
        this.setState({
            msgArray: this.state.msgArray.concat({user: this.props.usr, text: this.state.newMessage}),
            newMessage: ''
        });
    }

    handleChange = (event) => {
        event.keyCode !== 13 ?
            this.setState({
                newMessage: event.target.value
            }) :
            this.addNewMessage()
    }

    componentDidUpdate () {

        let msgs = this.state.msgArray
        const lastMsg = msgs[msgs.length - 1]

        if (lastMsg.user === this.props.usr) {
            setTimeout(() => {
                this.setState ({
                    msgArray: [...msgs, { user: null, text: 'NOOOOOOOOOO...' }],
                })
            }, 500)
        }
    }

    render() {
        //let user = this.props.usr
        let { usr } = this.props;
        

        let MessagesArr = this.state.msgArray.map( (message, index) => <Message key={ index } sender={ message.user } text={ message.text }/>)

        return (
            <div className="wrapper">
                <h2>ReactGram &copy;</h2>
                <p>Hello { usr }!</p>
               
                <Row className="flex-nowrap m-auto">
                    <Form.Control
                        type="text"
                        className="m-2"
                        placeholder="type here"
                        onChange={ this.handleChange }
                        onKeyUp= { this.handleChange }
                        value = { this.state.newMessage }
                    />
                    
                    <Button className="m-2" onClick={ this.addNewMessage }>Send&nbsp;Message</Button>
                </Row>

                { MessagesArr }
            </div>
        )

    }
}
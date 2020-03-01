import React, {Component} from 'react';
import { Button, Form, Row, Container } from 'react-bootstrap';

// import ReactDom from 'react-dom';
import './style.css';

import Message from '../Message/Message.jsx';

import { sendMessage } from '../../store/actions/messages_actions.js';

import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

class Messages extends Component {
    constructor(props) {
        super(props);
    }
    state = {
           newMessage: ''
       };

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
        let { messages } = this.props;
        

        let MessagesArr = [];

        Object.keys(messages).forEach(key => {
            MessagesArr.push( <Message key={ key } sender={ messages[key].user } text={ messages[key].text }/> )
        })


        return (
            <Container className="d-flex flex-column justify-content-end h-75">
                


                <div className="d-flex flex-column overflow-auto">
                    { MessagesArr }
                </div>
               
                <Row className="flex-nowrap">
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



            </Container>
        )

    }
}

const mapStateToProps = ({ msgReducer }) => ({
    messages: msgReducer.messages
});

const mapDispatchToProps = dispatch => bindActionCreators( { sendMessage }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
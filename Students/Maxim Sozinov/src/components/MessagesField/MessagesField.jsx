import React, {Component} from 'react';
// import ReactDom from 'react-dom';

import { Button, Form, Row, Container } from 'react-bootstrap';
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
       }

    addNewMessage = (text, sender) => {
        const { messages } = this.props;
        const messageId = Object.keys(messages).length + 1;

        this.props.sendMessage(messageId, sender, text);
        this.setState({
            newMessage: ''
        });
    }

    handleChange = (event) => {
        event.keyCode !== 13 ?
            this.setState({
                newMessage: event.target.value
            }) :
            this.addNewMessage(this.state.newMessage, this.props.usr);
    }

    componentDidMount() {
        let block = this.refs["msgBlock"];
        block.scrollTop = block.scrollHeight;
    }

    componentDidUpdate () {

        const { messages } = this.props;
        const lastMsg = messages[Object.keys(messages).length];

        if (lastMsg.user === this.props.usr) {
            setTimeout(() => {
                    this.addNewMessage( 'NOOOOOOOOOO...', null);
            }, 500);
        }
        let block = this.refs["msgBlock"];
        block.scrollTop = block.scrollHeight;
    }

    render() {

        let { usr } = this.props;
        let { messages } = this.props;

        let MessagesArr = [];

        Object.keys(messages).forEach(key => {
            MessagesArr.push( <Message key={ key } sender={ messages[key].user } text={ messages[key].text }/> );
        });


        return (
            <Container className="d-flex flex-column justify-content-end h-100 col-10">

                <div className="d-flex flex-column overflow-auto" ref="msgBlock">
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

                    <Button className="m-2" onClick={ () => this.addNewMessage (this.state.newMessage, usr) }>Send&nbsp;Message</Button>
                </Row>

            </Container>
        );

    }
}

const mapStateToProps = ({ msgReducer }) => ({
    messages: msgReducer.messages
});

const mapDispatchToProps = dispatch => bindActionCreators( { sendMessage }, dispatch );

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
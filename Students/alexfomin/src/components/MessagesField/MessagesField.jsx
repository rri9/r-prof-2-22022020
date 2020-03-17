import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { Row, Col, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import './style.css';

import Message from '../Message/Message.jsx'
import ChatList from '../ChatList/ChatList.jsx'

import { sendMessage, sendAnswer } from '../../store/actions/messages_actions.js'

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'


class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: ''
        }
    }


    //methods
    sendMessage = (text, sender, chatId) => {
        const { messages } = this.props
        const messageId = Object.keys(messages).length + 1;
        this.props.sendMessage(messageId, sender, text, chatId)
    }

    handleChange = (evt) => {
        if (evt.keyCode !== 13) {
            this.setState ({msg: evt.target.value})
        }
    }

    handleSendMessage = (message, sender, chatId) => {
        if (sender == 'Darth Vader') {
            this.sendMessage(message, sender, chatId)
        }
    }


    //hooks
    // componentDidUpdate (prevState) {
    //     let { messages } = this.props
    //     let msgLength = Object.keys(messages).length
    //     console.log(messages)
    //     let prevMsgLength = Object.keys(prevState.messages).length
    //     if (prevMsgLength < msgLength &&
    //         messages[msgLength].user === 'Darth Vader') {
    //         setTimeout(() => {
    //             const messageId = msgLength + 1;
    //             this.props.sendAnswer(messageId, 'Luke', "I'm not your son, just bot", this.props.chatId)
    //         }, 500)
    //     }
    // }

    

    render() {
        let { usr } = this.props
        let { messages } = this.props
        let MessagesArr = []
        Object.keys(messages).forEach(key => {
            if (messages[key].chatId === this.props.chatId) {
            MessagesArr.push(<Message 
                sender={ messages[key].user } 
                text={ messages[key].text }
                key={ key }
            />)
            }
        })
        
        return (
            <>
            <Row className="rowContent">
            <Col sm={{ size: 7, offset: 2 }} md={{ size: 6, offset: 2 }} lg={{ size: 6, offset: 3 }} ><div className="scrollContainer"><div className="MessagesContainer">{ MessagesArr }</div></div></Col>
            <Col sm="3"  md="4" lg="3"><ChatList/></Col>
        </Row>
        <Row className="rowSendButton">
          <Col sm="0" md="2" lg="3"></Col>
          <Col sm="12"  md="10" lg="6">       
            <InputGroup>
                <Input placeholder="текст сообщения" onChange = {this.handleChange} value={this.state.msg}/>
                <InputGroupAddon addonType="append" >
                <Button color="warning" onClick = { () => this.handleSendMessage (this.state.msg, 'Darth Vader', this.props.chatId) }>Отправить</Button>
                </InputGroupAddon>
                </InputGroup>
            </Col>
        </Row>
        </>

                //   <input type="text" 
                // onChange = { this.handleChange } 
                // onKeyUp = { this.handleChange }
                // value = { this.state.msg }/>
                // <button onClick = { this.sendMessage }>Send</button> <p>Hello { usr }!</p>
        );
    }
}

const mapStateToProps = ({ msgReducer }) => ({
    messages: msgReducer.messages
})

const mapDispatchToProps = dispatch => bindActionCreators( { sendMessage, sendAnswer }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
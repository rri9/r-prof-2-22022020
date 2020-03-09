import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { Row, Col, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import './style.css';

import Message from '../Message/Message.jsx'
import Chatlist from '../Chatlist/ChatList.jsx'

import { sendMessage, sendAnswer } from '../../store/actions/messages_actions.js'

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'


class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //msg: '',
        //     msgArray: [{
        //         user: 'Darth Vader',
        //         text: 'Hallo'
        //     },
        //     {
        //         user: null,
        //         text: null
        //     },
        //     {
        //         user: 'Darth Vader',
        //         text: 'I am your father'
        //     },
        //     {
        //         user: null,
        //         text: 'NOOOOOOOOO'
        //     },
        //     {
        //         user: 'Darth Vader',
        //         text: 'Hallo'
        //     },
        //     {
        //         user: null,
        //         text: null
        //     },
        //     {
        //         user: 'Darth Vader',
        //         text: 'I am your father'
        //     },
        //     {
        //         user: null,
        //         text: 'NOOOOOOOOO'
        //     },
        //     {
        //         user: 'Darth Vader',
        //         text: 'Hallo'
        //     }
        // ]
        }
    }


    //methods
    sendMessage = (text, sender) => {
        const { messages } = this.props
        const messageId = Object.keys(messages).length + 1;
        this.props.sendMessage(messageId, sender, text)
        // this.setState ({
        //     msgArray: [...this.state.msgArray, { user: this.props.usr, text: this.state.msg }], //ЯМы Дартвейдер
        //     msg: ''
        // })
    }

    handleChange = (evt) => {
        if (evt.keyCode !== 13) {
            this.setState ({msg: evt.target.value})
        }
    }

    handleSendMessage = (message, sender) => {
        this.setState({ msg: '' })
        if (sender == 'Darth Vader') {
            this.sendMessage(message, sender)
        }
    }

    //hooks
    // componentDidUpdate () {
    //  console.log (this.state)
    //     //let msgs = this.state.msgArray

    //     // if (msgs.length % 2 === 1) {
    //     //     setTimeout(() => {
    //     //         this.setState ({
    //     //             msgArray: [...this.state.msgArray, { user: null, text: 'NOOOOOOOOOO...' }], //ЯМы Дартвейдер
    //     //             msg: ''
    //     //         })
    //     //     }, 500)
    //     // }
    //     const messageId = Object.keys(this.state).length + 1;
    //     this.props.sendAnswer(messageId, 'Luke', 'Oh, nooo!')
    // }

    

    render() {
        let { usr } = this.props
        let { messages } = this.props
        let MessagesArr = []
        Object.keys(messages).forEach(key => {
            MessagesArr.push(<Message 
                sender={ messages[key].user } 
                text={ messages[key].text }
                key={ key }
            />)
        })
        
        return (
            <>
            <Row className="rowContent">
            <Col sm={{ size: 7, offset: 2 }} md={{ size: 6, offset: 2 }} lg={{ size: 6, offset: 3 }} ><div class="scrollContainer"><div class="MessagesContainer">{ MessagesArr }</div></div></Col>
            <Col sm="3"  md="4" lg="3"><Chatlist/></Col>
        </Row>
        <Row className="rowSendButton">
          <Col sm="0" md="2" lg="3"></Col>
          <Col sm="12"  md="10" lg="6">       
            <InputGroup>
                <Input onChange = {this.handleChange} value={this.state.msg}/>
                <InputGroupAddon addonType="append" >
                <Button color="warning" onClick = { () => this.handleSendMessage (this.state.msg, 'Darth Vader') }>Отправить</Button>
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
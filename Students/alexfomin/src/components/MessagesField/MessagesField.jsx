import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { Row, Col, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import './style.css';

import Message from '../Message/Message.jsx'
import Chatlist from '../Chatlist/ChatList.jsx'



export default class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: '',
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
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
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
            }
        ]
        }
    }


    //methods
    sendMessage = (e) => {
        this.setState ({
            msgArray: [...this.state.msgArray, { user: this.props.usr, text: this.state.msg }], //ЯМы Дартвейдер
            msg: ''
        })
        // e.target.value = ''
    }

    handleChange = (evt) => {
        evt.keyCode !== 13 ?
            this.setState ({msg: evt.target.value}) :
            this.sendMessage(evt)
    }

    //hooks
    componentDidUpdate () {
        // console.log ('updated')
        let msgs = this.state.msgArray

        if (msgs.length % 2 === 1) {
            setTimeout(() => {
                this.setState ({
                    msgArray: [...this.state.msgArray, { user: null, text: 'NOOOOOOOOOO...' }], //ЯМы Дартвейдер
                    msg: ''
                })
            }, 500)
        }
    }

    //
    

    render() {
        let { usr } = this.props
        let { msgArray } = this.state
        let MessagesArr = msgArray.map(message => <Message sender={ message.user } text={ message.text }/>)

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
                <Input />
                <InputGroupAddon addonType="append" >
                <Button color="warning" >Отправить</Button>
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
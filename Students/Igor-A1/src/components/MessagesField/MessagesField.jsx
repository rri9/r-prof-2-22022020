import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './style.css';

import Message from '../Message/Message.jsx'

export default class Messages extends Component {
    constructor(props) {
        super(props)
        //где-то тут... 
        this.state = {
          msgArray: [
            {
                user: 'Darth Vader',
                body: 'Hallo'
            },
            {
                user: null,
                body: null
            },
            {
                user: 'Darth Vader',
                body: 'I am your father'
            },
            {
                user: null,
                body: 'NOOOOOOOOO'
            }
          ]
        }
    }

    sendMessage = () => {
        this.setState ({
            msgArray: [...this.state.msgArray, {
              user: 'SysAdmin',
              text: document.querySelector(".msg_body").value
            }]
        })
        // clear input field
        document.querySelector(".msg_body").value = '';
    }

    render() {
        //let user = this.props.usr
        let { usr } = this.props
        let MessagesArr = this.state.msgArray.map(
          message => <Message sender={ message.user } text={ message.text }/>
        )

        return (
            <div className="wrapper">
                <h2>ReactGram&trade;</h2>
                <p>Hello { usr }!</p>
                { MessagesArr }
                <footer class="fixed-bottom">
                    <div class="d-flex justify-center align-center">
                        <input type="text" class="msg_body" placeholder="Введите cвоё сообщение" />
                        <button class="msg_btn" type="button" onClick = { this.sendMessage }>Отправить</button>
                    </div>
                </footer>
            </div>
        )
    }
}
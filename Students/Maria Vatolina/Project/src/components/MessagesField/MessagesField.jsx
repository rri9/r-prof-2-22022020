import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './style.css';

import Message from '../Message/Message.jsx'

export default class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msgArray: [{
                user: 'Darth Vader',
                text: 'Halo'
            },
            {
                user: null,
                text: null
            },
            {
                user: 'Darth Vader',
                text: 'Im your father'
            },
            {
                user: null,
                text: 'NOooOoooOo'
            }]
        }
    }
    sendMsg = () => {
        this.setState ({
            msgArray: [...this.state.msgArray, 
                {
                user: 'You',
                text: document.querySelector('.msgText').value
                }
            ]
        })
        document.querySelector('.msgText').value = '';
    }
    render () {
        // let user = this.props.user
        let { usr } = this.props

        let MessagesArr = this.state.msgArray.map(message => <Message sender={ message.user } text={ message.text } />)

        return (
            <div className="wrapper">
                <h2>ReactGram &copy;</h2>
                <p>Hello { usr } !</p>
                {MessagesArr}
                <div class="d-flex ">
                    <input class="msgText" type="text" placeholder="Enter message text"/>
                    <button class="msgBtn" type="button" onClick = { this.sendMsg }>Send</button>
                </div>
            </div>
        )
    }
}
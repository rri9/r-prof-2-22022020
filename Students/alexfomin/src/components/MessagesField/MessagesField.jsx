import React, {
    Component
} from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx'
import Button from '../Button/Button.jsx'

export default class Messages extends Component {
    constructor(props) {
       super(props)
        this.state = {list:[{
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
        ]}
    }

    sendMessage = (value, user) => {
        this.setState((state) => {
           state.list.push({
                user: user,
                text: value
            })
            this.render()
        }
        )
       
    }

    render() {
        //let user = this.props.usr
        let { usr } = this.props
        console.log(this.state)
            let MessagesArr = this.state.list.map((message, index) => <Message key={index} sender = {message.user}  text = {message.text} /> )

        return ( <div className = "wrapper" ><h2> ReactGram & copy; </h2> <p> Hello {usr}! </p> { MessagesArr} < Button sendMessage = { this.sendMessage}/> </div >
            )
        }
    }
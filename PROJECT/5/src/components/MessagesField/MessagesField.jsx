import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx'

//actions
import { sendMessage } from '../../store/actions/messages_actions.js'

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

class Messages extends Component {
    constructor(props) {
        super(props)
        //где-то тут... 
        this.state = {
            msg: '',
        }
    }
    //methods
    sendMessage = (text, sender) => {
        const { messages } = this.props
        const messageId = Object.keys(messages).length + 1;

        this.props.sendMessage(messageId, sender, text)
    }

    handleSendMessage = (message, sender) => {
        this.setState({ msg: '' })
        if (sender == 'Darth Vader') {
            this.sendMessage(message, sender)
        }
    }

    handleChange = (evt) => {
        if (evt.keyCode !== 13) {
            this.setState ({msg: evt.target.value})
        }
            //this.sendMessage(evt)
    }
    
    render() {
        //let user = this.props.usr
        let usr = 'Darth'
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
            <div className="wrapper">
                <h2>ReactGram &copy;</h2>
                <p>Hello { usr }!</p>
                <div>
                    { MessagesArr }
                </div>
                <input type="text" 
                onChange = { this.handleChange } 
                // onKeyUp = { this.handleChange }
                value = { this.state.msg }/>
                <button onClick = { () => this.handleSendMessage (this.state.msg, 'Darth Vader') }>Send</button>
            </div>
        )
    }
}

const mapStateToProps = ({ msgReducer }) => ({
    messages: msgReducer.messages
})

const mapDispatchToProps = dispatch => bindActionCreators( { sendMessage }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(Messages)

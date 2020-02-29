import React, {Component} from 'react';
import ReactDom from 'react-dom';


import Message from '../Message/Message.jsx'
import SendButton from '../Button/Button.jsx';

export default class Messages extends Component {
    constructor(props) {
        super(props)
        //где-то тут... 
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
            }]
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
        //let user = this.props.usr
        let { usr } = this.props
        let { msgArray } = this.state
        
        let MessagesArr = msgArray.map(message => <Message sender={ message.user } text={ message.text }/>)

        return (
            <div className="wrapper">
                <h2>ReactGram &copy;</h2>
                <p>Hello { usr }!</p>
                <div>
                    { MessagesArr }
                </div>
                {/* <input type="text" 
                onChange = { this.handleChange } 
                onKeyUp = { this.handleChange }
                value = { this.state.msg }/>
                <button onClick = { this.sendMessage }>Send</button> */}
                <SendButton/>
            </div>
        )
    }
}
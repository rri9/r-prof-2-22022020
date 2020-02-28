import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx'

export default class Messages extends Component {
    constructor(props) {
        super(props)
        //где-то тут...
        this.state = {
            msg: "",
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
        },
        this.addFixMessageHandle = this.addFixMessageHandle.bind(this)
    }

    addFixMessageHandle(e) {
        this.setState({msgArray: [...this.state.msgArray, {
            user: 'I',
            text: this.state.msg
            }],
            msg: ""
        });
        //e.target.value = "";
    }

    handleChange = (e) => {
        e.keyCode !== 13 ? //не нажимаем enter
            this.setState({msg: e.target.value}) : 
            this.addFixMessageHandle(e);
    }

    //hooks
        componentDidUpdate() {
            // console.log('updated');
            let msgs = this.state.msgArray;
            if (msgs.length % 2 === 1) {
                setTimeout(() => {
                    this.setState({msgArray: [...this.state.msgArray, {
                        user: 'Bot',
                        text: 'any answer'
                        }]
                    });
                }, 500)
            }
        }
    //
    render() {
        let { usr } = this.props

        let MessagesArr = this.state.msgArray.map((message, index) => <Message key = {index} sender={ message.user } text={ message.text }/>)

        return (
            <div className="wrapper">
                <h2>ReactGram &copy;</h2>
                <p>Hello { usr }!</p>
                <div>
                    { MessagesArr }
                </div>
                <input type="text" 
                    onChange = {this.handleChange} 
                    onKeyUp = {this.handleChange}
                    value = {this.state.msg}
                />
                <button onClick = {this.addFixMessageHandle}>add fixMessage</button>
            </div>
        )
    }
}
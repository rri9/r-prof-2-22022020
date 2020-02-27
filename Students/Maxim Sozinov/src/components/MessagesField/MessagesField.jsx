import React, {Component} from 'react';
// import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx';

export default class Messages extends Component {
    constructor(props) {
        super(props);
    }
    state = {
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
           }],

           newMessage: ''
       };
/* jshint ignore:start */
    addNewMessage = () => {
        this.setState({
            msgArray: this.state.msgArray.concat({user: this.props.usr, text: this.state.newMessage}),
            newMessage: ''
        });
    }

    handleChange = (event) => {
        event.keyCode !== 13 ?
            this.setState({
                newMessage: event.target.value
            }) :
            this.addNewMessage()
    }

    componentDidUpdate () {

        let msgs = this.state.msgArray

        if (msgs.length % 2 === 1) {
            setTimeout(() => {
                this.setState ({
                    msgArray: [...msgs, { user: null, text: 'NOOOOOOOOOO...' }],
                })
            }, 500)
        }
    }

    render() {
        //let user = this.props.usr
        let { usr } = this.props;
        

        let MessagesArr = this.state.msgArray.map(message => <Message sender={ message.user } text={ message.text }/>)

        return (
            <div className="wrapper">
                <h2>ReactGram &copy;</h2>
                <p>Hello { usr }!</p>
                <textarea
                    className="d-block m-2"
                    onChange={ this.handleChange }
                    onKeyUp= { this.handleChange }
                    value = { this.state.newMessage }
                    rows="3"
                    cols="40"
                />
                <button className="btn btn-primary mx-2 mb-4" onClick={ this.addNewMessage }>Send Message</button>
                { MessagesArr }
            </div>
        )

    }
}
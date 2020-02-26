import React, {Component} from 'react'
import ReactDom from 'react-dom'
import './style.css'

import Message from '../Message/Message.jsx'

export default class Messages extends Component {
   constructor (props) {
      super(props)
      this.state = { 
            msgArray: [
               { user: 'HelpDesk', text: 'Any problems?' },
               { user: 'TypicalLame', text: 'I clicked something and everything disappeared' },
               { user: null, text: null },
            ] 
         }
   }
   newMsg(message) {
      this.setState({ msgArray: [...this.state.msgArray, {user: 'Me', text: message} ]})  
   }
   render() {
      let { usr } = this.props

      let MessagesArr = this.state.msgArray.map((message, index) => <Message sender={ message.user } text={ message.text } key={ index }/>)
      
      return (
         <div className="wrapper">
            <h2>ReactGram &copy;</h2>
            <p>Hello { usr }!</p>
            { MessagesArr }
            <button onClick={this.newMsg.bind(this, 'Nu eto normalno')} className="btn">SEND</button>
         </div>
      )
   }
}
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import './style.css'

import Message from '../Message/Message.jsx'

export default class Messages extends Component {
   constructor (props) {
      super(props)
      this.state = { 
         msg: '',
         msgArray: [
            { user: null, text: "Any problems?" },
            { user: "TypicalLame", text: "I clicked something and everything disappeared" },
            { user: null, text: null },
            { user: "TypicalLame", text: "And what?" },
         ] 
      }
   }

   sendMsg = () => {
      this.setState({ 
         msgArray: [...this.state.msgArray, {user: this.props.usr, text: this.state.msg}],
         msg: ''
      }) 
   }

   handleChange = (event) => {
      event.keyCode !== 13 ?
         this.setState({ msg: event.target.value }) :
         this.sendMsg()
   }

   componentDidUpdate () {
      let msgs = this.state.msgArray
      if (msgs.length % 2 === 1) {
         setTimeout(() => {
            this.setState({ 
               msgArray: [...this.state.msgArray, {user: null, text: "We'll call you back"}],
               msg: ''
            }) 
         }, 500)
      }
   }

   render() {
      let { usr } = this.props
      let { msgArray } = this.state

      let MessagesArr = msgArray.map((message, index) => <Message sender={ message.user } text={ message.text } key={ index }/>)
      
      return (
         <div className="wrapper">
            <h2>ReactGram &copy;</h2>
            <p>Hello { usr }!</p>
            <div>
               { MessagesArr }
            </div>
            <input type="text" 
               onChange={ this.handleChange } 
               onKeyUp={ this.handleChange }
               value={ this.state.msg }/>
            <button onClick={ this.sendMsg } className="btn">SEND</button>
         </div>
      )
   }
}
import React, {Component} from 'react'
import ReactDom from 'react-dom'

import Message from '../Message/Message.jsx'

export default class Messages extends Component {
   constructor (props) {
      super(props)
   }

   render() {
      let { usr } = this.props
      let msgArray = [{
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
         text: null
      }]

      let MessagesArr = msgArray.map(message => <Message sender={ message.user } text={ message.text }/>)
      
      return (
         <div className="wrapper">
            <h2>ReactGram &copy;</h2>
            <p>Hello { usr }!</p>
            { MessagesArr }
         </div>
      )
   }
}
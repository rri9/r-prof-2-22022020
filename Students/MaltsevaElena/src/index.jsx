import React from 'react'
import ReactDom from 'react-dom'
import 'bootstrap'

import Messages from './components/MessagesField/MessageField.jsx'

let user = 'You'

ReactDom.render (
   <Messages usr={user}/>,
   document.getElementById('app')
)
import React from 'react'
import ReactDom from 'react-dom'
import './style.css'

let msg = (props) => {
   let { sender, text} = props
   sender ? sender = sender : sender = 'bot'
   text ? text = text : text = 'Go away!'
   return (
      <div className="d-flex flex-column msg">
         <strong>{ sender }</strong>
         <p>{ text }</p>
      </div>
   )
}

export default msg
import React from 'react'
import ReactDom from 'react-dom'
import './style.css'

let msg = (props) => {
   let { sender, text} = props
   sender ? sender = sender : sender = "HelpDesk"
   return (
      <div className="d-flex flex-column msg">
         <strong>{ sender }</strong>
         <p>{ props.sender || (!props.sender && text) ? text : "Trolololo"}</p>
      </div>
   )
}

export default msg
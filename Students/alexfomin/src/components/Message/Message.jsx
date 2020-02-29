import React from 'react';
import ReactDom from 'react-dom';
import { Toast, ToastBody, ToastHeader, Spinner } from 'reactstrap';
import './style.css';


// let msg = (props) => {
//     let { sender, text } = props
//     sender ? sender = sender : sender = 'Luke'
//     return  (
//     <div className="d-flex flex-column msg">
//         <strong>{ sender }</strong>
//         <p>{ props.sender || (!props.sender && text) ? text : 'go away plz...' }</p>
//     </div>
//     )
// }

// export default msg

const Message = (props) => {
    let { sender, text } = props
    sender ? sender = sender : sender = 'Luke'

    return (
      <div>
        <Toast>
          <ToastHeader icon="primary">
           {sender}
          </ToastHeader>
          <ToastBody>
          { props.sender || (!props.sender && text) ? text : 'go away plz...' }
          </ToastBody>
        </Toast>

      </div>
    );
  };
  
  export default Message;
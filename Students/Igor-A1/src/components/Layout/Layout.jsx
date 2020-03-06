import React, {Component} from 'react'

import ChatsHead      from '../ChatsHead/ChatsHead.jsx'
import ChatsList      from '../ChatsList/ChatsList.jsx'
import ChatsFoot      from '../ChatsFoot/ChatsFoot.jsx'

import MessagesHead   from '../MessagesHead/MessagesHead.jsx'
import MessagesField  from '../MessagesField/MessagesField.jsx'


let user = 'Я'

export default class Layout extends Component {
    render () {
        return (
          <div className="grid">
            <div className="chats">
                <ChatsHead />
                <ChatsList />
                <ChatsFoot />
            </div>
            
            <div className="msgs">
                <MessagesHead className="msgs-head" />
                <MessagesField
                  user = {user}
                />
            </div>
          </div>
        )
    }
}
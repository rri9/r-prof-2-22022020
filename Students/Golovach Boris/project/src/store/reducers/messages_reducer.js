import update from 'react-addons-update'
//import ACTIONS
import { SEND_MSG } from '../actions/messages_actions.js'

const initialStore = {
    messages: {
        1:{
            1:{
                user: 'Darth Vader',
                text: 'Hallo',
                chatId: 1
            },
            2:{
                user: null,
                text: null,
                chatId: 1
            },
            3:{
                user: 'Darth Vader',
                text: 'I am your father',
                chatId: 1
            },
            4:{
                user: null,
                text: 'NOOOOOOOOO',
                chatId: 1
            }
        },
        2:{
            1:{
                user: 'Bot',
                text: 'Вы в чате №2',
                chatId: 2
            }
        },
        3:{
            1:{
                user: 'Bot',
                text: 'Вы в чате №3',
                chatId: 2
            }
        }
    }
}

export default function msgReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MSG: {
            return update(store, {
                messages: {
                    [action.chatId]:{
                        $merge: { 
                            [action.messageId]: {
                                user: action.sender, 
                                text: action.text,
                                chatId: action.chatId
                            } 
                        }
                    }
 
                }
            });
        }
        default:
            return store;
    }
}
import update from 'react-addons-update'
//import ACTIONS
import { SEND_MSG, SEND_ANS } from '../actions/messages_actions.js'

const initialStore = {
    messages: {
        1: {
            user: 'Darth Vader',
            text: 'Hallo',
            chatId: 1
        },
        2: {
            user: 'Luke',
            text: 'Where is my droid?',
            chatId: 2
        },
        3: {
            user: 'Darth Vader',
            text: 'I am your father'
        },
        4: {
            user: 'Luke',
            text: 'NOOOOOOOOO',
            chatId: 3
        },
        5: {
            user: 'Luke',
            text: 'Get out!',
            chatId: 3
        },
        6: {
            user: 'Darth Vader',
            text: '))))))',
            chatId: 2
        },
        4: {
            user: 'Darth Vader',
            text: 'Yeap',
            chatId: 2
        },
    }
}

export default function msgReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MSG: {
            return update(store, {
                messages: { $merge: { [action.messageId]: { user: action.sender, text: action.text, chatId: action.chatId } } }
            });
        }
        case SEND_ANS: {
            return update(store, {
                messages: { $merge: { [action.messageId]: { user: action.sender, text: action.text, chatId: action.chatId } } }
            });
        }
        default:
            return store;
    }
}
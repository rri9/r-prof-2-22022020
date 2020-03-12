import update  from 'react-addons-update'
import { ADD_CHAT } from '../actions/chat_actions.js'

let initialStore = {
    chats: {
        1: {
            title: 'Dart', 
            messagesList: [] 
        },
        2: {
            title: 'Support', 
            messagesList: [] 
        },
        3: {
            title: 'Friend', 
            messagesList: [] 
        }
    }
}

export default function chatReducer(store = initialStore, action) {
    switch(action.type) {
        case ADD_CHAT: {
            let chatId = Object.keys(store.chats).length + 1;

            return update(store, {
                chats: { 
                    $merge: { 
                        [chatId]: {
                            title: action.sender, 
                            messagesList: [] 
                        } 
                    } 
                }
            });
        }
        default: {
            return store
        }
    }    
}
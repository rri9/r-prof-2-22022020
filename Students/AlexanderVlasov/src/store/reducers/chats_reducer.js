import update from 'react-addons-update';

import { ADD_CHAT } from '../actions/chats_action.js';

const initialStore = {
    chats: {
        1: {
            title: 'chat 1',
            messagesList: []
        },
        2: {
            title: 'chat 2',
            messagesList: []
        },
        3: {
            title: 'chat 3',
            messagesList: []
        }
    }
}

export default function chatsReducer(store = initialStore, action) {
    switch (action.type) {
        case ADD_CHAT: {
            const chatId = Object.keys(store.chats).length + 1;
            return update(store, {
                chats: { 
                    $merge: { 
                        [chatId] : { 
                            title: action.title, 
                            messagesList: []
                        } 
                    } 
                }
            })
        }
        default: return store;
    }
}
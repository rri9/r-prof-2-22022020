import update from 'react-addons-update';

import { ADD_CHAT } from '../actions/chats_action.js';

const initialStore = {
    chats: {
    }
}

export default function chatsReducer(store = initialStore, action) {
    switch (action.type) {
        case ADD_CHAT: {
            return update(store, {
                chats: { 
                    $merge: { 
                        [action.chatId] : { 
                            title: action.title
                        } 
                    } 
                }
            })
        }
        default: return store;
    }
}
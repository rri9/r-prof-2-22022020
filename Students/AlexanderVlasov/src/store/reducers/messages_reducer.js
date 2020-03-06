import update from 'react-addons-update';

import { SEND_MSG } from '../actions/messages_action.js';

const initialStore = {
    messages: {
        1:{
            user: 'Alex',
            text: 'hello'
        },
        2:{
            user: null,
            text: null
        },
        3:{
            user: 'Anna',
            text: 'Hi'
        },
        4:{
            user: null,
            text: null
        },
        5:{
            user: 'Alex',
            text: 'hello'
        },
        6:{
            user: null,
            text: null
        },
        7:{
            user: 'Anna',
            text: 'Hi'
        },
        8:{
            user: null,
            text: null
        },
        9:{
            user: null,
            text: null
        },
        10:{
            user: 'Anna',
            text: 'Hi'
        },
        11:{
            user: null,
            text: null
        }
    }
}

export default function msgReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MSG: {
            return update(store, {
                messages: { $merge: { [action.messageId] : { user: action.sender, text: action.text } } }
            })
        }
        default: return store;
    }
}
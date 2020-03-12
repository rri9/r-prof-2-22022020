import update from 'react-addons-update';

import { SEND_MSG, ADD_MSG_ID } from '../actions/messages_action.js';

const initialStore = {
    messages: {
        1:{
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
            }
        },
        2:{
            1:{
                user: 'Alex',
                text: 'hello'
            },
            2:{
                user: null,
                text: null
            },
        },
        3:{
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
                user: null,
                text: null
            },
            6:{
                user: 'Anna',
                text: 'Hi'
            },
            7:{
                user: null,
                text: null
            }
        },
    }
}

export default function msgReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MSG: {
            return update(store, {
                messages: {
                    [action.chatId] : {
                        $merge: {
                            [action.messageId]: {
                                user: action.sender, 
                                text: action.text 
                            }
                        }
                    }
                }
            })
        }
        case ADD_MSG_ID: {
            const newId = Object.keys(store.messages).length + 1;
            return update(store, {
                messages: {
                    $merge: {
                        [newId] : {
                        }
                    }
                }
            })
        }
        default: return store;
    }
}
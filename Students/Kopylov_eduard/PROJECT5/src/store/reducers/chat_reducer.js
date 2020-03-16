import update from 'react-addons-update';

import {ADD_CHAT} from '../actions/chat_actions.js';


let initialStore = {
    chats: {
        1: {
            title: "Chat1",
            messagesList: [],
            messages: {

                1: {
                    user: 'Darth Vader chat 1',
                    text: 'Hallo'
                },
                2: {
                    user: null,
                    text: null
                },
                3: {
                    user: 'Darth Vader',
                    text: 'I am your father'
                },
                4: {
                    user: null,
                    text: 'NOOOOOOOOO'
                }

            }
        },
        2: {
            title: "Chat2",
            messagesList: [],
            messages: {

                1: {
                    user: 'Darth Vader chat 2',
                    text: 'Hallo'
                },
                2: {
                    user: null,
                    text: null
                },
                3: {
                    user: 'Darth Vader',
                    text: 'I am your father'
                },
                4: {
                    user: null,
                    text: 'NOOOOOOOOO'
                }

            }
        },
        3: {
            title: "Chat3",
            messagesList: [],
            messages: {

                1: {
                    user: 'Darth Vader chat 3',
                    text: 'Hallo'
                },
                2: {
                    user: null,
                    text: null
                },
                3: {
                    user: 'Darth Vader',
                    text: 'I am your father'
                },
                4: {
                    user: null,
                    text: 'NOOOOOOOOO'
                }

            }
        },
        4: {
            title: "Chat4",
            messagesList: [],
            messages: {

                1: {
                    user: 'Darth Vader chat 4   ',
                    text: 'Hallo'
                },
                2: {
                    user: null,
                    text: null
                },
                3: {
                    user: 'Darth Vader',
                    text: 'I am your father'
                },
                4: {
                    user: null,
                    text: 'NOOOOOOOOO'
                }

            }
        }
    }
}

export default function chatReducer(store = initialStore, action){
    switch (action.type) {
        case ADD_CHAT:{
            let chatId = Object.keys(store.chats).length+1;
            return update(store, {
                chats : { 
                    $merge: 
                    { [action.chatId]: { 
                        title: action.title, 
                        messagesList: [],
                        user: action.user,
                        sender: action.sender,
                        text: action.text

                     } 
                    } }
            });
        }
            
            
    
        default:
           return store;
    }
}
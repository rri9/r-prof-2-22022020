import update from 'react-addons-update'
// ACTIONS
import {
    SEND_MSG
} from '../actions/messages_actions.js'

let initialStore = {
    chats: {
        1: {
            messages: {
                1: {
                    user: null,
                    text: "Welcome to Chat 1!"
                },
                2: {
                    user: 'Darth Vader',
                    text: 'I am your father'
                },
                3: {
                    user: null,
                    text: 'NOOOOOOOOO'
                },
            }
        },
        2: {
            messages: {
                1: {
                    user: null,
                    text: "Welcome to Chat 2!"
                },
                2: {
                    user: 'Darth Vader',
                    text: 'Hello, Luke!'
                },
                3: {
                    user: null,
                    text: 'Go away!!!'
                },
            }

        },
        3: {
            messages: {
                1: {
                    user: null,
                    text: "Welcome to Chat 3!"
                },
                2: {
                    user: 'Darth Vader',
                    text: 'Join the dark side!'
                },
                3: {
                    user: null,
                    text: 'Do you have a cookies?'
                },
            }

        }

    }
}
export default function msgReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MSG: {
            initialStore = update(store, {
                chats: {
                    [action.chatId]: {
                        messages: {
                            $merge: {
                                [action.messageId]: {
                                    user: action.sender,
                                    text: action.text
                                }
                            }
                        }
                    }
                }
            });
            return initialStore;
        }
        default:
            return store
    }
}
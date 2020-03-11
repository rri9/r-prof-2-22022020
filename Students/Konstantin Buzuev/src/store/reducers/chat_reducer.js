import update from 'react-addons-update'
// ACTIONS
import {
    SEND_MSG
} from '../actions/chat_actions.js'
import {
    ADD_CHAT
} from '../actions/room_actions.js'


let initialStore = {
    chats: {
        1: {
            name: "Room 1",
            description: "First room",
            type: "normal",
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
            name: "Room 2",
            description: "Second room",
            type: "important",
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
            name: "Room 3",
            description: "Third room",
            type: "VIP",
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

        },
    }
}

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MSG: {
            initialStore = update(store, {
                chats: {
                    [action.chatID]: {
                        messages: {
                            $merge: {
                                [action.messageID]: {
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
        case ADD_CHAT: {
            initialStore = update(store, {
                chats: {
                    $merge: {
                        [action.chatID]: {
                            name: action.name,
                            description: action.description,
                            type: action.chatType,
                            messages: {}
                        }
                    }
                }
            });
            return initialStore;
        }

        default:
            return store;
    }
}
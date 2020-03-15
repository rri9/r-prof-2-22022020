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
        },
        2: {
            name: "Room 2",
            description: "Second room",
            type: "important",
        },
        3: {
            name: "Room 3",
            description: "Third room",
            type: "VIP",
        }
    },
}

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case ADD_CHAT: {
            initialStore = update(store, {
                chats: {
                    $merge: {
                        [action.chatID]: {
                            name: action.name,
                            description: action.description,
                            type: action.chatType,
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
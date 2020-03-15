import update from 'react-addons-update'
// ACTIONS
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
            store = update(store, {
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
            return store;
        }

        default:
            return store;
    }
}
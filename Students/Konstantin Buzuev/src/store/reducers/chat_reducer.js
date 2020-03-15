import update from 'react-addons-update'
// ACTIONS
import {
    ADD_CHAT,
    START_MESSAGES_LOADING,
    SUCCESS_MESSAGES_LOADING,
    ERROR_MESSAGES_LOADING,

} from '../actions/room_actions.js'


let initialStore = {
    chats: {},
    isLoading: false
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
        case START_MESSAGES_LOADING: {
            store = update(store, {
                isLoading: {
                    $set: true
                },
            });
            return store;
        }
        case SUCCESS_MESSAGES_LOADING: {
            const chats = action.payload;
            store = update(store, {
                chats: {
                    $merge: chats
                },
                isLoading: {
                    $set: false
                },
            });
            return store;
        }
        case ERROR_MESSAGES_LOADING: {
            store = update(store, {
                isLoading: {
                    $set: false
                },
            });
            return store;
        }

        default:
            return store;
    }
}
import update from 'react-addons-update'
// ACTIONS
import {
    SEND_MESSAGE,
    LOAD_MESSAGE,
    START_MESSAGES_LOADING,
    SUCCESS_MESSAGES_LOADING,
    ERROR_MESSAGES_LOADING
} from '../actions/chat_actions.js'


let initialStore = {
    messages: [],
    isLoading: false,
}

export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case LOAD_MESSAGE:
        case SEND_MESSAGE: {
            store = update(store, {
                messages: {
                    $push: [{
                        messageID: action.messageID,
                        chatID: action.chatID,
                        user: action.sender,
                        text: action.text

                    }]
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
            const messages = action.payload;
            store = update(store, {
                messages: {
                    $push: messages
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
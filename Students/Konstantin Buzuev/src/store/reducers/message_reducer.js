import update from 'react-addons-update'
// ACTIONS
import {
    SEND_MSG
} from '../actions/chat_actions.js'


let initialStore = {
    messages: [{
            messageID: 1,
            chatID: 1,
            user: "Bot",
            text: "Welcome to Chat 1!"
        },
        {
            messageID: 2,
            chatID: 1,
            user: 'Darth Vader',
            text: 'I am your father'
        },
        {
            messageID: 3,
            chatID: 1,
            user: "Bot",
            text: 'NOOOOOOOOO'
        },
        {
            messageID: 4,
            chatID: 2,
            user: "Bot",
            text: "Welcome to Chat 2!"
        },
        {
            messageID: 5,
            chatID: 2,
            user: 'Darth Vader',
            text: 'Hello, Luke!'
        },
        {
            messageID: 6,
            chatID: 2,
            user: "Bot",
            text: 'Go away!!!'
        },
        {
            messageID: 7,
            chatID: 3,
            user: "Bot",
            text: "Welcome to Chat 3!"
        },
        {
            messageID: 8,
            chatID: 3,
            user: 'Darth Vader',
            text: 'Join the dark side!'
        },
        {
            messageID: 9,
            chatID: 3,
            user: "Bot",
            text: 'Do you have a cookies?'
        },

    ],

}

export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MSG: {
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
        default:
            return store;
    }
}
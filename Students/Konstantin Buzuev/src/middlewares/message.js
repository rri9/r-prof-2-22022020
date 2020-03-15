import {
    SEND_MSG,
    sendMessage
} from '../store/actions/chat_actions.js'


export default store => next => (action) => {
    switch (action.type) {
        case SEND_MSG:
            if (!!action.sender) {
                setTimeout(() => {
                    let currentID = store.getState().messageReducer.messages.length + 1;
                    store.dispatch(sendMessage(
                        currentID,
                        action.chatID,
                        null,
                        null
                    ))
                }, 300);
            }
    }
    return next(action)
}
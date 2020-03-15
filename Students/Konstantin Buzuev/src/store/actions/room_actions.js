import {
    RSAA,
    getJSON
} from 'redux-api-middleware';

export const START_MESSAGES_LOADING = '@@room/START_MESSAGES_LOADING';
export const SUCCESS_MESSAGES_LOADING = '@@room/SUCCESS_MESSAGES_LOADING';
export const ERROR_MESSAGES_LOADING = '@@room/ERROR_MESSAGES_LOADING';

export const loadChats = () => ({
    [RSAA]: {
        endpoint: '/staticapi/chats.json',
        method: 'GET',
        types: [
            START_MESSAGES_LOADING,
            {
                type: SUCCESS_MESSAGES_LOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => json,
                ),
            },
            ERROR_MESSAGES_LOADING,
        ],
    },
});

export let ADD_CHAT = "@@room/ADD_CHAT";

export let addChat = (chatID, name, description, type) => ({
    type: ADD_CHAT,
    chatID: chatID,
    name: name,
    description: description,
    chatType: type
});
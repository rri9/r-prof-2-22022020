export let ADD_CHAT = '@@messages/ADD_CHAT';

export let addChat = (title) => ({
    type: ADD_CHAT,
    title: title
})
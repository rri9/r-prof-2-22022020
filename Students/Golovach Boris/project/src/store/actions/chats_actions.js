export let ADD_CHAT = '@@chat/ADD_CHAT'

export let addChat = (chatId, title) => ({
    type: ADD_CHAT,
    title: title,
    chatId: chatId
})
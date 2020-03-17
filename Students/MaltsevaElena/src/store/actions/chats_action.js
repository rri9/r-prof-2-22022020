export let ADD_CHAT = '@@chat/ADD_CHAT'

export let addChat = (chatId, title) => ({
   type: ADD_CHAT,
   chatId: chatId,
   title: title
})

export let DEL_CHAT = '@@chat/DEL_CHAT'

export let deleteChat = (chatId) => ({
   type: DEL_CHAT,
   chatId
})
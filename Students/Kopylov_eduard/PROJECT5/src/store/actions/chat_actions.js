export let ADD_CHAT = "@@chat/ADD_CHAT";

export let addChat = (chatId,sender, text,title)=> ({
    type: ADD_CHAT,
    title: title,
    sender: sender,
    text: text,
    chatId: chatId
})
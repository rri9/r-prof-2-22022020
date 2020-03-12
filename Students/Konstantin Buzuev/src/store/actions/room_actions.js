export let ADD_CHAT = "@@chat/ADD_CHAT";

export let addChat = (chatID, name, description, type) => ({
    type: ADD_CHAT,
    chatID: chatID,
    name: name,
    description: description,
    chatType: type
});
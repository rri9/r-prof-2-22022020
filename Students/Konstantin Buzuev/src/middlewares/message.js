import {
  SEND_MESSAGE,
  sendMessage
} from "../store/actions/chat_actions.js";

export default store => next => action => {
  switch (action.type) {
    case SEND_MESSAGE:
      action.sender = action.sender ? action.sender : "Bot";
      action.text = action.text ? action.text : "Sorry, I'm busy ...";
      let sendAnswer = action.sender !== "Bot";
      if (action.text === "111") {
        action.type = null;
        sendAnswer = false;
      }
      if (sendAnswer) {
        setTimeout(() => {
          let currentID = store.getState().messageReducer.messages.length + 1;
          store.dispatch(sendMessage(currentID, action.chatID, null, null));
        }, 300);
      }
  }
  return next(action);
};
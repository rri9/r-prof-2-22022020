import { SEND_MSG } from "../store/actions/messages_actions" ;

import botData from './botData.json';
const randomBotData = () => Math.floor(Math.random() * botData.emoji.length);
const randomBotEmoj = () => String.fromCodePoint(botData.emoji[randomBotData()]);
const randomBotMsg = () => botData.msg[randomBotData()];

export default store => next => action => {
  let chat = store.getState().chatsReducer.chats[action.chatId];
  console.log(store.getState())
  const botPrefix = `${chat.bot} :: `;
  //console.log(action.type, action.sender, action.text)
  switch (action.type) {
    case SEND_MSG:
      if(action.sender === chat.user) {
        //console.log ('Надо бы ответить')
        setTimeout(() => {
            //this.setState ({
                // chat.msg = [...chat.msgArray, 
                  // {
                    // msgId: chat.msgArray.length + 2,
                    // sender: `${botPrefix}${randomBotEmoj()}`,
                    // text: randomBotMsg() 
                  // }
                // ];
            //});
        }, 500)
      };
  };
  return next(action);
};
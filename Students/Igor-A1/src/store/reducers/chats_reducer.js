import update from 'react-addons-update';

import { ADD_CHAT } from '../actions/chats_actions.js';
import { SEND_MSG } from '../actions/messages_actions.js';

const initialStore = {
  chats: {
    1: {
      title: 'Chat 1', 
      msgList: [
        {
          chatId: 1,
          msgId:  1,
          sender: 'Darth Vader',
          text:   'Hallo'
        },
        {
          chatId: 1,
          msgId:  2,
          sender: null,
          text:   null
        },
        {
          chatId: 1,
          msgId:  3,
          sender: 'Darth Vader',
          text:   'I am your father'
        },
        {
          chatId: 1,
          msgId:  4,
          sender: null,
          text:   'NOOOOOOOOO'
        }
      ]
    },
    2: {
      title: 'Chat 2', 
      msgList: [
        {
          chatId: 2,
          msgId:  1,
          sender: 'Geek',
          text:   'Превед!'
        },
        {
          chatId: 2,
          msgId:  2,
          sender: null,
          text:   null
        },
        {
          chatId: 2,
          msgId:  3,
          sender: 'Geek',
          text:   'Чё ты гонишь?'
        }
      ]
    },
    3: {
      title: 'Chat 3', 
      msgList: [
        {
          chatId: 3,
          msgId:  1,
          sender: 'Администратор',
          text:   'Всем выйти из чата!'
        },
        {
          chatId: 3,
          msgId:  2,
          sender: null,
          text:   null
        }
      ]
    }
  }
};

export default function chatReducer(store = initialStore, action) {
  switch(action.type) {
    case SEND_MSG: {
      return update(store, {
        chats: { $merge: { 
            [action.chatsId]: {
              title: store.chats[action.chatId].title,
              msgList: [...store.chats[action.chatId].msgList, action.msgId]
            } 
          } 
        }
      });
    }
    case ADD_CHAT: {
      const chatId = Object.keys(store.chats).length + 1;

      return update(store, {
          chats: { 
            $merge: { 
              [chatId]: { 
                  title: action.title, 
                  msgList: []
              } 
            } 
          }
      });
    }
    default: {
      return store;
    }
  };
};
import update from 'react-addons-update';

import { ADD_CHAT } from '../actions/chats_actions.js';
import { SEND_MSG } from '../actions/messages_actions.js';

const initialStore = {
  chats: {
    1: {
      title:  'Чат 1',
      user:   'Я',
      bot:    'робот',
      msgList: [
        {
          sender: 'Darth Vader',
          text:   'Hallo'
        },
        {
          sender: null,
          text:   null
        },
        {
          sender: 'Darth Vader',
          text:   'I am your father'
        },
        {
          sender: null,
          text:   'NOOOOOOOOO'
        }
      ]
    },
    2: {
      title:  'Chat 2',
      user:   'Me',
      bot:    'bot',
      msgList: [
        {
          sender: 'Geek',
          text:   'Превед!'
        },
        {
          sender: null,
          text:   null
        },
        {
          sender: 'Geek',
          text:   'Чё ты гонишь?'
        }
      ]
    },
    3: {
      title:  'Курам на смех!',
      user:   'Васисуалий Пупкин-Таврический',
      bot:    'конь-голова',
      msgList: [
        {
          sender: 'Администратор',
          text:   'Всем выйти из чата!'
        },
        {
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
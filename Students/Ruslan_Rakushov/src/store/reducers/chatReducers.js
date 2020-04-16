import update from 'immutability-helper';
import {
  CHATS_LOADING_START, CHATS_LOADING_SUCCESS, CHATS_LOADING_ERROR,
  CHAT_ADD_START, CHAT_ADD_SUCCESS, CHAT_ADD_ERROR,
  CHAT_DEL_START, CHAT_DEL_SUCCESS, CHAT_DEL_ERROR,
  CHAT_BLINK_START, CHAT_BLINK_END,
  CHAT_SET_CURRENT,
} from '../actions/chatActions.js';
import {
  MESSAGE_ADD_START, MESSAGE_ADD_SUCCESS, MESSAGE_ADD_ERROR,
  MESSAGE_DEL_START, MESSAGE_DEL_SUCCESS, MESSAGE_DEL_ERROR,
  SEARCH_TEXT_SET, 
} from '../actions/messageActions.js';

const initialStore = {
  chats: [],
  chatsWithNewMsg: [],
  currentChatId: undefined,
  isLoading: false,
  chatsLoadingError: '',
  chatMessage: '',
  searchText: '',
  isMessageLoading: false,
  messageLoadingError: '',
};

export default function chatReducers(store = initialStore, action) {
  switch (action.type) {
    case CHAT_SET_CURRENT:
      let newCurrentChatId = '';
      if (action.chatId !== '') {
        newCurrentChatId = action.chatId;
      } else if (store.chats.length > 0) {
        newCurrentChatId = store.chats[0]._id;
      }
      return update(store, {
        currentChatId: { $set: newCurrentChatId },
        chatsLoadingError: { $set: '' },
        messageLoadingError: { $set: '' },
      });
//-----------------------------------------
    case CHATS_LOADING_START:
      return update(store, {
        isLoading: { $set: true }
      });
    case CHATS_LOADING_SUCCESS:
      {
        const currentChatId = action.payload.length ? action.payload[0]._id : undefined;
        if (currentChatId) {
          return update(store, {
            chats: { $set: action.payload },
            currentChatId: { $set: currentChatId },
            isLoading: { $set: false },
            chatsLoadingError: { $set: '' },
          });
        } else {
          return update(store, {
            isLoading: { $set: false },
            chatsLoadingError: { $set: 'No chats loaded' },
          });
        }
      }
    case CHATS_LOADING_ERROR:
      return update(store, {
        isLoading: { $set: false },
        chatsLoadingError: { $set: action.payload },
      });
//-----------------------------------------
    case CHAT_ADD_START:
      return update(store, {
        isLoading: { $set: true },
        chatsLoadingError: { $set: '' },
        chatMessage: { $set: '' },
      });
    case CHAT_ADD_SUCCESS:
      return update(store, {
        chats: { $push: [{
          _id: action.payload.chatId,
          title: action.payload.title,
          messages: []
          }]
        },
        isLoading: { $set: false },
        chatsLoadingError: { $set: '' },
        chatMessage: { $set: action.payload.message },
      });
    case CHAT_ADD_ERROR:
      return update(store, {
        isLoading: { $set: false },
        chatsLoadingError: { $set: action.payload },
        chatMessage: { $set: '' },
      });
//-----------------------------------------
    case CHAT_DEL_START:
      return update(store, {
        isLoading: { $set: true },
        chatsLoadingError: { $set: '' },
        chatMessage: { $set: '' },
      });
    case CHAT_DEL_SUCCESS:
      {
        const currentChatIndex = store.chats.findIndex(chat => chat._id === action.payload.id);
        return update(store, {
          chats: { $splice: [[currentChatIndex, 1]] },
          isLoading: { $set: false },
          chatsLoadingError: { $set: '' },
          chatMessage: { $set: action.payload.message },
        });
      }
    case CHAT_DEL_ERROR:
      return update(store, {
        isLoading: { $set: false },
        chatsLoadingError: { $set: action.payload },
        chatMessage: { $set: '' },
      });
//-----------------------------------------
    case MESSAGE_ADD_START:
      return update(store, {
        isMessageLoading: { $set: true },
        messageLoadingError: { $set: '' },
      });
    case MESSAGE_ADD_SUCCESS:
      {
        const currentChatIndex = store.chats.findIndex(chat => chat._id === action.payload.currentChatId);
        if (currentChatIndex < 0) return store;
        return update(store, {
          chats: {
            [currentChatIndex]: {
              messages: { $push: [{
                  _id: action.payload.messageId,
                  senderId: action.payload.senderId,
                  sender: action.payload.sender,
                  text: action.payload.message
              }]}
            }
          },
          isMessageLoading: { $set: false },
          messageLoadingError: { $set: '' },
        });
      }
    case MESSAGE_ADD_ERROR:
      return update(store, {
        isMessageLoading: { $set: false },
        messageLoadingError: { $set: action.payload },
      });
//-----------------------------------------
    case MESSAGE_DEL_START:
      return update(store, {
        isMessageLoading: { $set: true },
        messageLoadingError: { $set: '' },
      });
    case MESSAGE_DEL_SUCCESS:
      {
        const { messageId, currentChatId } = action.payload;
        const currentChatIndex = store.chats.findIndex(chat => chat._id === currentChatId);
        const currentMessageIndex = store.chats[currentChatIndex].messages.findIndex(msg => msg._id === messageId);
        if (currentChatIndex < 0 || currentMessageIndex < 0) return store;
        return update(store, {
          chats: {
            [currentChatIndex]: {
              messages: { $splice: [[currentMessageIndex, 1]] }
            }
          },
          isMessageLoading: { $set: false },
          messageLoadingError: { $set: '' },
        });
      }
    case MESSAGE_DEL_ERROR:
      return update(store, {
        isMessageLoading: { $set: false },
        messageLoadingError: { $set: action.payload },
      });
//-----------------------------------------
    case CHAT_BLINK_START:
      return update(store, { chatsWithNewMsg: { $push: [action.payload] } });
    case CHAT_BLINK_END:
      {
        const blinkingChatIdIndex = store.chatsWithNewMsg.indexOf(action.payload);
        return update(store, { chatsWithNewMsg: { $splice: [[blinkingChatIdIndex, 1]] } });
      }
//-----------------------------------------
    case SEARCH_TEXT_SET:
      return update(store, {
        searchText: { $set: action.str}
      });
      
    default:
      return store;
  }
}

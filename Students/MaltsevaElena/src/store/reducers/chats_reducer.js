import update from 'react-addons-update'
//import ACTIONS

const initialStore = {
   chatRooms: {
      1: { title: "HelpDesk"},
      2: { title: "Darth Vader"},
      3: { title: "Typical JS"},
   }
}

export default function chatReducer (store = initialStore, action) {
   switch (action.type) {
      // case NEW_CHAT: {
      //    console.log("it's future feature")
      // }
      default:
         return store
   }
}
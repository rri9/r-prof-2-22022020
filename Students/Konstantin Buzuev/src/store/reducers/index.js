import {
    combineReducers
} from "redux";
import chatReducer from "./chat_reducer.js";
import messageReducer from "./message_reducer.js";


export default combineReducers({
    chatReducer,
    messageReducer
})
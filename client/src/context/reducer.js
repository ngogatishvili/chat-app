import {  GET_CONTACTS, GET_CURRENT_CONVERSATION, SET_CURRENT_CONTACT, SET_USER } from "./constants"




const reducer=(state,action)=>{
    switch(action.type) {
        case GET_CONTACTS:
            return {...state,contacts:action.payload};
        case SET_CURRENT_CONTACT:
            return {...state,currentContact:action.payload}
        case GET_CURRENT_CONVERSATION:
            return {...state,currentConversationMessages:action.payload}
        case SET_USER:
            return {...state,user:action.payload}
        default:return state;
    }
}

export default reducer;
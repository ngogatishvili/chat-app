import React,{createContext} from "react";
import { useContext } from "react";
import { useReducer } from "react";
import reducer from "./reducer";



const UserContext=createContext();





const initialState={
    allUsers:[],
    contacts:[],
    user:JSON.parse(localStorage.getItem("user"))||null,
    currentConversationMessages:[],
    currentContact:null
}

export const UserContextProvider=({children})=>{
        
    
   

   
    return <UserContext.Provider value={useReducer(reducer,initialState)}>{children}</UserContext.Provider>
}


export const useUserContext=()=>useContext(UserContext);



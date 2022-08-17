import axios from 'axios';
import React from 'react'
import { useEffect,useCallback } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import styled from "styled-components"
import { GET_CURRENT_CONVERSATION } from '../context/constants';
import { useUserContext } from '../context/UserContext'
import { getAllMessages } from '../utils/APIRoutes';
import ChatInput from './ChatInput';
import Logout from './Logout';
import Messages from './Messages';

const ChatContainer = ({socket}) => {
  const [{currentContact,user},dispatch]=useUserContext();

  const fetchMessages=useCallback(async()=>{
    try{
      const {data}=await axios.post(getAllMessages,{
        from:user?.user?._id,
        to:currentContact._id

      },{
        headers:{
          "Authorization":`Bearer ${user.token}`
        }
      })
     ;
      dispatch({type:GET_CURRENT_CONVERSATION,payload:data})

    }catch(err) {
        toast.error(err.response.data.msg||err.messsage)
    }
  },[user?.token,user?.user?._id,dispatch,currentContact._id])
  
  useEffect(()=>{
   
    

    fetchMessages();
    
  },[currentContact,user?.user?._id,dispatch,user?.token,fetchMessages])
  return (
    <Container>
      
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentContact.avatarImage}`} alt="recipient"/>
          </div>
          <div className="username">
            <h3>{currentContact.username}</h3>
          </div>
        </div>
        <Logout/>
      </div>
      <Messages />
      <ChatInput socket={socket} />
      <ToastContainer/>
    </Container>
  )
}

export default ChatContainer;


const Container=styled.div`
  padding:1.2rem;
  display:grid;
  grid-template-rows:15% 75% 10%;
  gap:0.1rem;
  overflow:hidden;

  .chat-header {
    display:flex;
    justify-content:space-between;
    align-items:center;
    


    .user-details {
      display:flex;
      align-items:center;
      gap:1rem;

      .avatar {
        img {
          height:3rem;
        }

      }
      .username {
        h3 {
          color:white;
        }
      }
    }
  }


`




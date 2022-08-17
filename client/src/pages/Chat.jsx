import React,{useEffect,useRef} from 'react';
import styled from "styled-components"
import axios from "axios";
import { getContacts, host } from '../utils/APIRoutes';
import { Contacts } from '../components/Contacts';
import { useUserContext } from '../context/UserContext';
import {  GET_CONTACTS } from '../context/constants';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client"


const Chat = () => {
  const socket=useRef();
  const [{user}]=useUserContext();

  const [{currentContact},dispatch]=useUserContext()






  useEffect(()=>{
    const fetchContacts=async()=>{
          const {data}=await axios.get(getContacts,{
            headers:{
              "Authorization":`Bearer ${user.token}`
            }
          });
          dispatch({type:GET_CONTACTS,payload:data})


    }
    if(user) {
      if(user?.user?.isAvatarImageSet) {
        fetchContacts();
    }
    
      
    }
    
  },[dispatch,user])

  useEffect(()=>{
    socket.current=io(host);
    socket.current.emit("add-user",user?.user?._id);
  },[user?.user?._id])
  
  return (
    <Container>
      <div style={{color:"white"}} className="search">
        <input className="user-input" placeholder="Search for user.." type="text"/>
        <button className='search-button'>Search</button>
      </div>
      <div className="container">
        <Contacts/>
        {currentContact? <ChatContainer socket={socket}/>:<Welcome/> }
        
      </div>
      
    </Container>
  )
}






const Container=styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;

  .search {
    margin:2rem 0;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:1rem;
    

    .user-input {
      height:2rem;
      font-size:1.2rem;
      width:60%;
      border:1px solid #ffffff;
      background:transparent;
      border-radius:0.2rem;
      color:#fff;
      padding:0.4rem;

      &:focus {
        background:#131324;
      }
      
    }

    .search-button {
      padding:0.4rem;
      height:2rem;
      border:#fff;
      border-radius:0.2rem;
      cursor:pointer;
      transition:all 0.4s ease-in-out;

      &:hover {
        background:#00000076;
        color:white;
      }
    }
  }
  
  .container {
    height:85vh;
    padding:2rem;
    width:85vw;
    background-color:#00000076;
    display:grid;
    grid-template-columns:25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px) {
      grid-template-columns:30% 70%;
    }

  }
`

export default Chat;

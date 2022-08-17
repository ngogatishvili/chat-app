import React from 'react'
import styled from "styled-components"
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
import { useState } from 'react'
import {toast,ToastContainer} from "react-toastify";
import { useUserContext } from '../context/UserContext'
import axios from "axios"
import { sendMessages } from '../utils/APIRoutes'
import { GET_CURRENT_CONVERSATION } from '../context/constants'
import { useEffect } from 'react'


const ChatInput = ({socket}) => {

 

    const [{user,currentContact,currentConversationMessages},dispatch]=useUserContext();
    console.log(currentContact)
    const [showEmojiPicker,setShowEmojiPicker]=useState(false);
    const [message,setMessage]=useState("");
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      };
    const sendMessage=async(msg)=>{
        try {
        const {data}=await axios.post(sendMessages,{
            from:user?.user?._id,
            to:currentContact._id,
            message:msg
        },{
            headers:{
                "Authorization":`Bearer ${user?.token}`
            }
        })
        setMessage("")
        toast.success(data.msg,{autoClose:"2000"});
        socket.current.emit("send-message",{
            to:currentContact._id,
            from:user?.user?._id,
            message:msg
        })
        let messages=[...currentConversationMessages,{fromSelf:true,message:msg}];
        dispatch({type:GET_CURRENT_CONVERSATION,payload:messages})

        

        

        
        
        }catch(err) {
            toast.error(err.response?.data.msg||err.message,toastOptions)
        }
        

       
        
    }

    const emojiHandler=()=>{
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick=(event,emoji)=>{
        let msg=message;
        msg+=emoji.emoji;
        setMessage(msg);
        console.log(emoji)
    }
    useEffect(()=>{
        if(socket.current) {
            socket.current.on("recieve-message",(message)=>{

            })
        }
    })
  return (
    <Container>
        <div  className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={emojiHandler}/>
                {showEmojiPicker && <Picker   onEmojiClick={handleEmojiClick}/>}
              
            </div>
        </div>
        <div  className="input-container">
            <textarea value={message} onChange={e=>setMessage(e.target.value)} className="send-input" type="text" placeholder="type your message here..."/>
            <button onClick={sendMessage} type="submit" className="send-button"  disabled={message.length===0}  >
                <IoMdSend/>
            </button>
        </div>
        <ToastContainer/>
    </Container>
  )
}

export default ChatInput;


const Container=styled.div`
    display:grid;
    grid-template-columns:5% 95%;
    background-color:#080420;
    align-items:center;
    padding:0 2rem;
    padding-bottom:0.3rem;

    .button-container {
        display:flex;
        align-items:center;
        gap:1rem;
        .emoji {
            position:relative;

            svg {
                font-size:1.5rem;
                color:#ffff00c8;
                cursor:pointer;
            }

            .emoji-picker-react {
                position:absolute;
                top:-350px;
                background-color:#080420;
                box-shadow:0 5px 10px #9a86f3;
                border-color:#9a86f3;
                
                
                .emoji-categories {
                    button {
                        filter:contrast(0)
                    }
                }

                .emoji-search {
                    background-color:transparent;
                    border-color:#9186f3;
                    color:white;
                }

                .emoji-group::before {
                    background-color:#080420;
                }

                .emoji-scroll-wrapper::-webkit-scrollbar {
                        background-color:#080420;
                        width:5px;
                        &-thumb {
                            background-color:#9a86f3;
                        }
                }
            }
        }
    }


    .input-container {
        width:100%;
        background:#ffffff34;
        border-radius:2rem;
        display:flex;
        align-items:center;
        gap:2rem;

        .send-input {
            width:90%;
            border:none;
            background:transparent;
            padding-left:2rem;
            padding-top:0.4rem;
            outline:none;
            color:white;
            &::-webkit-scrollbar {
                width:0.2rem;
                &-thumb {
                    width:0.1rem;
                    background-color:#ffffff39;
                    border-radius:1rem;
                }

            }

        }

        .send-button {
            padding:0.3rem 2rem;
            border-radius:2rem;
            cursor:pointer;
            border:none;
            display:flex;
            justify-content:center;
            align-items:center;
            background-color:${props=>props.dis?"gray":"#9a86f3"};
            


            svg {
                font-size:1.5rem;
                color:white;
            }

        }
        
    }

   



   
`

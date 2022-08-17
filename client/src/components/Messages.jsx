import React from 'react'
import styled from "styled-components"
import { useUserContext } from '../context/UserContext'

const Messages = () => {
  const [{currentConversationMessages}]=useUserContext();
 
  return (
    <Container>
      {currentConversationMessages.map((message,index)=>{
        return (
          <div key={index}>
            <div className={`message  ${message.fromSelf?"sended":"recieved"}`}>
                <div className="content">
                  <p>{message?.message}</p>
                </div>
            </div>
          </div>
        )
      })}
    </Container>
  )
}

export default Messages;


const Container=styled.div`
  max-height:100%;
  padding:1rem 2rem;
  display:flex;
  flex-direction:column;
  gap:1rem;
  overflow:auto;
  &::-webkit-scrollbar {
    width:0.2rem;

    &-thumb {
      width:0.1rem;
      background-color:#ffffff39;
      border-radius:1rem;
      
    }
  }
  .message {
    display:flex;
    align-items:center;
    .content {
      max-width:40%;
      overflow-wrap:break-word;
      padding:1rem;
      font-size:1.1rem;
      border-radius:1rem;
      color:#d1d1d1;

    }
  }

  .sended {
    justify-content:flex-end;

    .content {
      background-color:#4f04ff21;
    }
  }

  .recieved {
    justify-content:flex-start;

    .content {
      background-color:#9900ff20;
    }
  }


`

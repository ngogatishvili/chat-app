import React, {useState} from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { SET_CURRENT_CONTACT } from '../context/constants';
import {useUserContext} from '../context/UserContext';

export const Contacts = () => {
  const [{contacts, user},dispatch] = useUserContext();
  console.log(user);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeChat=(index)=>{
    console.log(index);
    setCurrentSelected(index);
    
    dispatch({type:SET_CURRENT_CONTACT,payload:contacts[index]})
   
  }
  
  return (
    <>
      <Container>
        <div className='brand'>
          <img src={Logo} alt='logo' />
          <h3>Snappy</h3>
        </div>
        <div className='contacts'>
          {contacts.map((contact, index) => {
            return (
              <div onClick={()=>changeChat(index)}
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? 'selected' : ''
                }`}>
                <div className='avatar'>
                  <img
                    src={
                      `data:image/svg+xml;base64,${contact.avatarImage}` ||
                      'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'
                    }
                    alt='avatar'
                  />
                </div>
                <div className='username'>
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
         
        </div>
        <div className='currentUser'>
          <div className='avatar'>
            <img
              src={
                `data:image/svg+xml;base64,${user?.user?.avatarImage}` ||
                'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'
              }
              alt='avatar'
            />
          </div>
          <div className='username'>
            <h2>{user?.user?.username}</h2>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
    display:grid;
    grid-template-rows:10% 75% 15%;
    overflow:hidden;
    grid-auto-flow:column;
    background-color:#080420;
    .brand {
      display:flex;
      justify-content;center;
      align-items:center;
      gap:1rem;

      img {
        width:2rem;
      }
      h3 {
        color:white;
        text-transform:uppercase;
      }

    }

    .contacts {
        display:flex;
        flex-direction:column;
        align-items;center;
        overflow:auto;
        gap:0.8rem;
        &::-webkit-scrollbar {
          width:0.2rem;

          &-thumb {
            width:0.1rem;
            background-color:#ffffff39;
            border-radius:1rem;
            
          }
        }
        }

        .contact {
          display:flex;
          gap:1rem;
          align-items:center;
          transition:0.5s ease-in-out;
          padding:0.4rem;
          background-color:#ffffff39;
          min-height:5rem;
          width:90%;
          cursor:pointer;
          border-radius:0.2rem;
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

        .selected {
          background:#9186f3;
        }
    }

    .currentUser {
      background-color:#0d0d30;
      display:flex;
      align-items:center;
      justify-content:center;
      gap:2rem;

      .avatar {
        img {
          height:4rem;
          max-inline-size:100%;
        }
      }

      .username {
        h2 {
          color:white;
        }
      }

      @media screen and (min-width:720px) and (max-width:1080px) {
          gap:0.5rem;
          .username {
            font-size:1rem;
          }
      }
    }



`;

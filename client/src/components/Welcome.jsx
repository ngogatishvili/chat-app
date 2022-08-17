import React from 'react'
import styled from "styled-components"
import RobotGif from "../assets/robot.gif"
import { useUserContext } from '../context/UserContext';


const Welcome = () => {
    const [{user}]=useUserContext();
  return (
    <Container>
        <img src={RobotGif} alt="robot"/>
        <h1>Welcome <span>{user?.user?.username}</span></h1>
        <h3>Please select a chat to start messaging</h3>
    </Container>
  )
}

export default Welcome;


const Container=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    color:white;
    img {
        height:20rem;
    }h1 {
        span {
            color:#4e0eff;
        }
    }
`

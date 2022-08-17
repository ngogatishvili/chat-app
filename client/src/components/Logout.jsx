import React from 'react'
import {useNavigate} from "react-router-dom";
import styled from "styled-components"
import axios from "axios"
import {BiPowerOff} from "react-icons/bi";
import { useUserContext } from '../context/UserContext';
import { SET_CURRENT_CONTACT, SET_USER } from '../context/constants';

const Logout = () => {
    const [,dispatch]=useUserContext();
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.clear();
        dispatch({type:SET_CURRENT_CONTACT,payload:null});
        dispatch({type:SET_USER,payload:null})
        navigate("/login")

    }
  return (
    <Button onClick={handleLogout}>
      <BiPowerOff/>
    </Button>
  )
}

export default Logout;

const Button=styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    padding:0.5rem;
    border-radius:0.5rem;
    background-color:#9a86f3;
    border:none;
    cursor:pointer;
    svg {
        font-size:1.3rem;
        color:#ebe7ff;
    }

`


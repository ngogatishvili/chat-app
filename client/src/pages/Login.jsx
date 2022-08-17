import React, {useState} from 'react';
import styled from 'styled-components';
import {Link,useNavigate} from 'react-router-dom';
import logo from '../assets/logo.svg';
import {toast, ToastContainer} from 'react-toastify';
import axios from "axios";
import { loginRoute} from '../utils/APIRoutes';
import { useEffect } from 'react';
import { SET_USER } from '../context/constants';
import { useUserContext } from '../context/UserContext';


const Login = () => {
  const [,dispatch]=useUserContext();
  const navigate=useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
 
  });

  

  useEffect(()=>{
    if(localStorage.getItem("user")) {
          navigate("/")
    }
  },[navigate])


  const handleSubmit = async (e) => {
    const {username, password} = values;

    e.preventDefault();
    if(handleValidation()) {
      
     
      try {
        const {data}=await axios.post(loginRoute,{username,password})
        localStorage.setItem("user",JSON.stringify({user:data.user,token:data.token}))
        dispatch({type:SET_USER,payload:{user:data.user,token:data.token}})
        navigate("/setAvatar");
      }catch(err) {
        toast.error(err.response?.data.msg||err.message,toastOptions)
      }
     
    }
  };

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const handleValidation = () => {
    const {username, password} = values;

    if (username==="") {
      toast.error('Username is required', toastOptions);

      return false;
    
    }else if(password==="") {
      toast.error("password is required",toastOptions);
      return false;
    }

    return true;
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img src={logo} alt='logo' />
            <h1>Snappy</h1>
          </div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={(e) => handleChange(e)}
            min="3"
          />
         
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
          />
         
          <button type='submit'>Login</button>
          <span>
            Not an account? <Link to='/register'>Sign up</Link>{' '}
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  width:100vw;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction-column;
  gap:1rem;
  background-color:#131324;

  .brand {
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img {
      height:5rem;
    }
    h1 {
      color:white;
      text-transform:uppercase;
    }

   
  }

  form {
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    align-items:center;

    input {
      background:transparent;
      padding:1rem;
      border:0.1rem solid #4e0eff;
      border-radius:0.4rem;
      color:white;
      width:100%;
      font-size:1rem;

      &:focus {
        border:0.1rem solid #997af0;
        outline:none;
      }
    }

    button {
      width:100%;
      background-color:#997af0;
      color:white;
      padding:1rem 2rem;
      border:none;
      font-weight:bold;
      cursor:pointer;
      border-radius:0.4rem;
      font-size:1rem;
      text-transform:uppercase;
      transition:0.5s ease-in-out;
      &:hover {
        background-color:#4e0eff;
      }
    }

    span {
      color:white;
      text-transform:uppercase;

      a {
        color:#4e0eff;
        text-decoration:none;
        font-weight:bold;
      }
    }
  }



`;

export default Login;


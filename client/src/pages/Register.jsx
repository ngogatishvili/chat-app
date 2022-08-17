import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import {Link,useNavigate} from 'react-router-dom';
import logo from '../assets/logo.svg';
import {toast, ToastContainer} from 'react-toastify';
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
  const navigate=useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleSubmit = async (e) => {
    const {username, email, password} = values;

    e.preventDefault();
    if(handleValidation()) {
      
     
      try {
        const {data}=await axios.post(registerRoute,{username,email,password})
        toast.success(data.msg);
        setTimeout(()=>{
          navigate("/login");
        },4000)
       
      }catch(err) {
       toast.error(err.response.data.msg||err,toastOptions)
      }
     
    }
  };

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(()=>{
    if(localStorage.getItem("user")) {
          navigate("/")
    }
  },[])

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const handleValidation = () => {
    const {username, email, password, confirmPassword} = values;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', toastOptions);

      return false;
    }else if(username.length<3) {
        toast.error("username should be more than 3 characters long",toastOptions);
        return false;
    }else if(password.length<8) {
      toast.error("password length should be equal or greater than 8 characters long",toastOptions);
      return false;
    }else if(email==="") {
      toast.error("email is required",toastOptions);
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
          />
          <input
            type='email'
            placeholder='E-mail'
            name='email'
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            placeholder='Repeat Password'
            name='confirmPassword'
            onChange={(e) => handleChange(e)}
          />
          <button type='submit'>Create User</button>
          <span>
            Already have an account? <Link to='/login'>Log in</Link>{' '}
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

export default Register;

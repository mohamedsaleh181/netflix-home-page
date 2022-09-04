import React, { useRef } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Nav from '../../components/navbar/Nav';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

import './SignUp.css'

function SignUp() {
  const [inputError, setInputError] = useState('')
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const setData = async(e) =>{
    e.preventDefault();
    await setDoc(doc(db, "users", emailRef.current.value), {
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    });
  }
  const register = (e) => {
    e.preventDefault();
    if(confirmRef.current.value !== passwordRef.current.value){
      return setInputError("Password don't match.")
    }
    
      try{
        createUserWithEmailAndPassword(
          auth,
            emailRef.current.value,
            passwordRef.current.value
          )
          setDoc(doc(db, "users", emailRef.current.value), {
            userData: {
              email: emailRef.current.value,
              password: passwordRef.current.value,
            },
            favList: [],
          });
        navigate('/')
        setInputError("")
      } catch(error) {
        if(error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'){
          setInputError('The email address is already in use by another account.')
        }
        if(error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).'){
          setInputError('The email address is badly formatted.')
        }
        if(error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
          setInputError('Password should be at least 6 characters.')
        }else{
          setInputError(error.message)
        }
      }
      
  };


  return (
    <div className="loginScreen">
    <div className="loginScreen__background">
      <Nav />
      <div className="loginScreen__gradient"></div>
    </div>
    <div className="loginScreen__body">
      <div className="signInScreen">
        <form>
          <h1>Sign Up</h1>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={confirmRef} type="password" placeholder="Confirm Password" />
          <p className='signIn__error'>{inputError}</p>
          <button type="submit" onClick={register}>
            Sign Up
          </button>
          <h4>
            <span className="signInScreen__gray">already have account. </span>
            <span className="signInScreen__link" onClick={()=>{navigate('/signIn')}}>
              Sign In.
            </span>
          </h4>
        </form>
      </div>
    </div>
  </div>
  )
}

export default SignUp
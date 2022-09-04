import React from 'react'
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Nav from "../../components/navbar/Nav";
import './SignIn.css'


function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [inputError, setInputError]= useState("")


  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        setInputError("")
        navigate('/')
      })
      .catch((error) => {
        if(error.message == "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."){
          setInputError("Incorrect Email")
        }
        if(error.message == "Firebase: Error (auth/wrong-password)."){
          setInputError("The password is wrong.")
        }
        if(error.message == "Firebase: Error (auth/user-not-found)."){
          setInputError("This email not found")
        }else{
          setInputError(error.message)
        }
        
        
      });

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
            <h1>Sign In</h1>
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <p className='signIn__error'>{inputError}</p>
            <button type="submit" onClick={signIn}>
              Sign In
            </button>
            <h4>
              <span className="signInScreen__gray">New to Netflix? </span>
              <span className="signInScreen__link" onClick={()=>{navigate('/signUp')}}>
                Sign Up.
              </span>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn
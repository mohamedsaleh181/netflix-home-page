import React from "react";
import "./Login.css";
import Nav from "../../components/navbar/Nav";
import { useState } from "react";
import SignIn from "../signInScreen/SignIn";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
// import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Login() {
    
  return (
    <>
      <div className="loginScreen">
        <div className="loginScreen__background">
          <Nav />
          <div className="loginScreen__gradient"></div>
        </div>
        <div className="loginScreen__body">
          <>
                <h1>Unlimited movies, TV programmes and more.</h1>
                <h2>Watch anywhere. Cancel at any time.</h2>
                <h3>
                  Ready to watch? Enter your email to create or restart your
                  membership.
                </h3>
                <div className="loginScreen__input">
                  <form>
                    <input type="email" placeholder="Email Address" />
                    <Link to="/signIn">
                      <button className="loginScreen__getStarted">
                        GET STARTED
                      </button>
                    </Link>
                    {/* <button  className='loginScreen__getStarted'>GET STARTED</button> */}
                  </form>
                </div>
          </>
        </div>
      </div>
    </>
  );
}

export default Login;

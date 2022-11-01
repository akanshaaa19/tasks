import React, { useContext, useId, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../../../firebase";
import {doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

import "./AuthForm.css";

import LoadingSpinner from "../Loading/Loading";
import AuthContext from "../../store/auth-context";

function AuthForm() {
  const authCtx = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const history = useHistory();

  const emailRef = useRef();
  const passwordRed = useRef();
  const nameRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function addUser(name, email) {
    await setDoc(doc(db, "users", email), {
      name: name,
      email: email,
      todos: [],
    });
  }



  function sendRequest(e) {
    e.preventDefault();
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDs0XhraQIYMSvPANlmsQN55macoKi_tqo";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDs0XhraQIYMSvPANlmsQN55macoKi_tqo";
    }
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRed.current.value,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((data) => {
            setError(data.error.message);
          });
        }
      })
      .then((data) => {
        // console.log(data)
        if (!isLogin) {
          addUser(nameRef.current.value, emailRef.current.value);
          localStorage.setItem('email', emailRef.current.value)
        } else {
          authCtx.getUser(data.email).then((result) => {
            console.log(result);
            localStorage.setItem('email', result.email)
          });
        }
        authCtx.loginHandeler(data.idToken);
        history.replace("/todo");
      });
  }

  return (
    <div className="auth-form container w-100 m-auto">
      <h2>
        <span className="appName">Tasks app</span>
      </h2>

      <form onSubmit={sendRequest} className="form">
        <div className="form-cont">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              ref={nameRef}
            />
          )}

          <input type="email" ref={emailRef} placeholder="Email" required />
          <input
            type="password"
            ref={passwordRed}
            placeholder="Password"
            required
          />
          {isLoading ? (
            <div className="centered">
              <LoadingSpinner />
            </div>
          ) : (
            <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
          )}
        </div>
      </form>
      <p>
        <button className="change-btn" onClick={switchAuthModeHandler}>
          {!isLogin
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </p>
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}

export default AuthForm;

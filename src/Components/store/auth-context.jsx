import React, { useState } from "react";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  loginHandeler: (token) => {},
  logoutHandeler: () => {},
  getUser: (email) => {}
});

export function AuthContextProvider(props) {
  const initialToken = localStorage.getItem("token");

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token; //if token is not empty this will return true, if token is empty this will return false

  function loginHandeler(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  function logoutHandeler() {
    localStorage.clear();
    setToken(null);
  }

  async function getUser(email) {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return;
    }
  }

  const ctxValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    loginHandeler: loginHandeler,
    logoutHandeler: logoutHandeler,
    getUser: getUser
  };

  return (
    <AuthContext.Provider value={ctxValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

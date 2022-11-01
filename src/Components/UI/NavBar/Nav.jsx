import React, { useContext } from "react";
import './Nav.css'
import AuthContext from "../../store/auth-context";

function Nav() {
  const authCtx = useContext(AuthContext);

  return (
    <header>
      <div>
        <h1>taskss</h1>
      </div>
      {authCtx.isLoggedIn && <div className="logout-btn"
        onClick={() => {
          authCtx.logoutHandeler();
        }}
      >
        <i className="fa-solid fa-user "></i>
      </div>}
    </header>
  );
}

export default Nav;

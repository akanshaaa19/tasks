import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./MainNavigation.css";

function MainNavigation() {
  const authCtx = useContext(AuthContext);

  const nav = (
    <div class="fixed inline-flex flex-col items-center w-16 h-full overflow-hidden text-gray-400 bg-gray-900 rounded">
      <NavLink class="flex items-center justify-center mt-3" to="#">
        <svg
          class="w-8 h-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
      </NavLink>
      <div class="flex flex-col items-center mt-3 border-t border-gray-700">
        <NavLink
          class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
          to="/"
        >
         <i class="fa-solid fa-house fa-lg"></i>
        </NavLink>
        <NavLink
          class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
          to="/todo"
        >
          <i class="fa-solid fa-list-check fa-lg"></i>
        </NavLink>
        <NavLink
          class="flex items-center justify-center w-12 h-12 mt-2 text-gray-200 bg-gray-700 rounded"
          to="/pomo"
        >
          <i class="fa-solid fa-hourglass-end fa-lg"></i>
        </NavLink>
       
      </div>
      
      <NavLink
        class="flex items-center justify-center w-16 h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
        to="#"
      >
        <div
          className="logout-btn"
          onClick={() => {
            authCtx.logoutHandeler();
          }}
        >
          <i className="fa-solid fa-user "></i>
        </div>
      </NavLink>
      {/* <div title="logout">
        <button
          className="logout-btn"
          onClick={() => {
            authCtx.logoutHandeler();
          }}
        >
          <i className="fa-solid fa-user "></i>
        </button>
      </div> */}
    </div>
  );

  return (
    <React.Fragment>
      {nav}
      {/* {ReactDOM.createPortal(nav, document.getElementById("nav-hook"))} */}
    </React.Fragment>
  );
}

export default MainNavigation;

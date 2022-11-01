import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Collection from "./Components/pages/Collections/Collection";
import AuthForm from "./Components/UI/authForm/AuthForm";
import AuthContext from "./Components/store/auth-context";
import MainNavigation from "./Components/UI/Navigation/MainNavigation";
import Nav from "./Components/UI/NavBar/Nav";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <BrowserRouter>
      {authCtx.isLoggedIn ? console.log("hii") : console.log("not hi")}
      <Nav />
      <Switch>
        <Route path="/auth">
          {authCtx.isLoggedIn && <Redirect to="/todo" />}
          {!authCtx.isLoggedIn && <AuthForm />}
        </Route>

        <Route path="/" exact>
          <Redirect to="/auth" />
        </Route>

        <Route path="/todo" exact>
          {authCtx.isLoggedIn && <Collection />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;

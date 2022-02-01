import React,{useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/login-page/login-page";
import HomePage from "./pages/home-page/home-page";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const history=useHistory()

  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
        <Switch>
          <Route path="/" exact={true}>
            <LoginPage login="true" />
          </Route>
          <Route path="/signup">
            <LoginPage login="false" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

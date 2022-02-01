import * as React from "react";
import "./login-page.scss";
import logo from "../../logo.png";
import loginpic from "../../loginpic.jpg";
import { GoogleLogin } from "react-google-login";
import Login from "../../components/login/login";
import Signup from "../../components/signup/signup";

export interface ILoginPageProps {
  login:string;
}

export default function LoginPage(props: ILoginPageProps) {
 
  return (
    <div className="login-page">
      <div className="container">
        <div className="login-illustration">
          <img src={loginpic} alt="login-illustration" className="login-image" />
        </div>
        {
          props.login==="true" ?
          <Login/>
          :
          <Signup/>
        }
     
      </div>
    </div>
  );
}

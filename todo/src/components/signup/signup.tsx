import * as React from "react";
import logo from "../../logo.png";
import { GoogleLogin } from "react-google-login";
import { Link, useHistory } from "react-router-dom";
import "./signup.scss";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export interface ISignupProps {}

export default function Signup(props: ISignupProps) {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const history = useHistory();

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      toast.info("Enter all the deatails");
    } else {
      fetch("http://localhost:5000/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.info(data.error);
          } else {
            toast.info("Signed Up Successfully");
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log("data is", email, password, firstName, lastName);
  };

  const responseGoogle = (response: any) => {
    console.log(response, "response is");
  };

  return (
    <div className="login-content">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="pic" className="logo-image" />
          <h2>
            DO<span>.IN</span>
          </h2>
        </div>
        <div className="tag-line">Now manage all your tasks at one place !</div>
      </div>
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="title">SIGN UP</div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="Email"
          type="text"
          name="username"
          required
        />
        <input
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="firstName"
          placeholder="First Name"
          type="text"
          name="first-name"
          required
        />
        <input
          onChange={(e) => setLastName(e.target.value)}
          autoComplete="lastName"
          placeholder="Last Name"
          type="text"
          name="last-name"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          name="password"
          required
        />

        <button type="submit" className="btn-filled">
          SIGN UP
        </button>
      </form>
      or
      <div>
        <GoogleLogin
          clientId="414128650010-siu168nbpfd0nn0t85n79v9b1m7riutc.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <div className="sub-text">
        <Link to="/">Already have an account?</Link>
      </div>
    </div>
  );
}

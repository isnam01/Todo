import * as React from "react";
import logo from "../../logo.png";
import { GoogleLogin } from "react-google-login";
import "./login.scss";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const history = useHistory();

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      toast.info("Enter all the deatails");
    } else {
      fetch("http://localhost:5000/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.info(data.error);
          } else {
            toast.info("Signed In Successfully");
            localStorage.setItem("todoToken", data.token);
            history.push("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const responseGoogle = (response: any) => {
    console.log(response)
    if (response.tokenId) {
      fetch("http://localhost:5000/emaillogin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenId: response.tokenId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.info(data.error);
          } else {
            toast.info("Signed In Successfully");
            localStorage.setItem("todoToken", data.token);
            history.push("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        <div className="title">LOG IN</div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="text"
          name="username"
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
          LOG IN
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
        <Link to="/signup">Don't have an account?</Link>
      </div>
    </div>
  );
}

import React, { useState, useContext } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Cookies from "universal-cookie";

const Login = () => {
  const navigate = useNavigate();

  // States of email and password
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorMessage, setError] = useState("");

  // State of User that we got from UserContext.Provider in App.js
  const cookies = new Cookies();
  let { user, setUser } = useContext(UserContext);

  //login function POST REQUEST TO BACKEND with user info
  var login = () => {
    axios({
      method: "POST",
      data: {
        email: email,
        password: password,
        //username: userName
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => {
      console.log(res.data["login"] == "Successfully Authenticated");
      if (res.data["login"] === "Successfully Authenticated") {
        setUser(res.data["user"]);
        console.log(user);
        navigate("/CSI4999");
        // localStorage.setItem("username", userName);
        // localStorage.setItem("password", password);
      } else {
        setError("Wrong Email or Password");
      }
    });
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <form>
        {errorMessage === "" ? null : <p>{errorMessage}</p>}
        <br></br>
        <label>
          Email:
          <br></br>
          <input
            className="form"
            type="email"
            name="name"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Password:
          <br></br>
          <input
            className="form"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br></br>
        <input type="button" value="Login" className="form" onClick={login} />
      </form>
    </div>
  );
};

export default Login;

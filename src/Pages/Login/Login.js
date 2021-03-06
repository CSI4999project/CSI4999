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
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => {
      if (res.data["login"] === "Successfully Authenticated") {
        setUser(res.data["user"]);
        navigate("/CSI4999");
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
        <label >
          <h3>Email:</h3>
          <br></br>
          <input className='formReg' type="email" name="name" onChange={(e)=> setEmail(e.target.value)}/>
        </label>
        <br></br>
        <span className='space'></span>

        <label>
        <br></br>
        <h3>Password:</h3>
          <br></br>
          <input className='formReg' type="password" name="password" onChange={(e)=> setPassword(e.target.value)}/>
        </label>
        <br></br>
        <input type="button" value="Login"  className='formReg submit' onClick={login}/>
    </form>

    
    </div>
  );
};

export default Login;

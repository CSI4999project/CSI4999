import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  // States of email and password
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [userName, setUserName] = useState("");
  let [errorMessage, setError] = useState("");
  let [error2, setError2] = useState("");

  var register = () => {
    const authObject = {
      "Private-Key": process.env.REACT_APP_PRIVATE_KEY,
    };

    axios({
      method: "POST",
      data: {
        email: email,
        password: password,
        username: userName,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => {
      if (res.data === "User With Email Already Exists") {
        setError("User With Email Already Exists");
        console.log(res);
      } else {
        navigate("/login");
      }
    });

    axios.post(
      "https://api.chatengine.io/users/",
      { username: userName, secret: process.env.REACT_APP_CHAT_PASSWORD}, // Body object
      { headers: authObject } // Headers object
    ).catch((error) => {
      console.log(error)
      setError2("Oops, something went wrong with the chat engine server. Please try again.");
    })
  };

  return (
    <div className="center">
      <h1>Register</h1>
      <form>
        {errorMessage === "" ? null : <p>{errorMessage}</p>}
        {error2 === "" ? null : <p>{error2}</p>}
        <br></br>
        <label>
          Email:
          <br></br>
          <input
            className="form"
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Username:
          <br></br>
          <input
            className="form"
            type="text"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
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
        <input
          type="button"
          value="Sign Up"
          className="form"
          onClick={register}
        />
      </form>
    </div>
  );
};

export default Register;

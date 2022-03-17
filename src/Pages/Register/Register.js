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

  var register = async () => {
    const authObject = {
      "Private-Key": "76fab49d-b1b9-4293-a5c3-1f7e63236443",
    };

    axios
      .all([
        axios.post(
          "https://api.chatengine.io/users/",
          { username: userName, secret: password }, // Body object
          { headers: authObject } // Headers object
        ),
        axios.post("http://localhost:4000/register", {
          email: email,
          password: password,
          username: userName,
        }),
      ])
      .then((res) => {
        if (res.data === "User With Email Already Exists") {
          setError("User With Email Already Exists");
          console.log(res);
        } else {
          navigate("/login");
        }
      });

    // login the user
    localStorage.setItem("username", userName);
    localStorage.setItem("password", password);
  };

  return (
    <div className="center">
      <h1>Register</h1>
      <form>
        {errorMessage === "" ? null : <p>{errorMessage}</p>}
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
          Usename:
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

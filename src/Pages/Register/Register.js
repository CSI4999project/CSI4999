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
  let [userType, setUserType] = useState("Instructor");
  let [error2, setError2] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");

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
        usertype: userType,
        firstname: firstName,
        lastname: lastName,
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

    axios
      .post(
        "https://api.chatengine.io/users/",
        { username: userName, secret: process.env.REACT_APP_CHAT_PASSWORD }, // Body object
        { headers: authObject } // Headers object
      )
      .catch((error) => {
        console.log(error);
        setError2(
          "Oops, something went wrong with the chat engine server. Please try again."
        );
      });
  };

  return (
    <div className="center">
      <h1>Register</h1>
      <form style={{alignContent: "center"}}>
        {errorMessage === "" ? null : <p>{errorMessage}</p>}
        {error2 === "" ? null : <p>{error2}</p>}
        <br></br>
        <div style={{ display: "inline-block"}}>
        <div style={{ float: "left" }}>
          <label>
            <h3>First Name:</h3>

            <input
              className="formReg"
              type="text"
              name="firstname"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>

        <div style={{ float: "right" }}>
          <label>
            <h3>Last Name:</h3>
            <input
              className="formReg"
              type="text"
              name="lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div style={{ float: "left" }}>
          <label>
            <h3>Email:</h3>

            <input
              className="formReg"
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div style={{ float: "right" }}>
          <label>
            <h3>Username:</h3>

            <input
              className="formReg"
              type="text"
              name="username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
        </div>
        <div style={{ float: "left" }}>
          <label>
            <h3>Password:</h3>

            <input
              className="formReg"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div style={{ float: "right" }}>
          <label>
            <h3>Sign Up as:</h3>

            <select
              className="formReg"
              id="Type"
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="Instructor">Instructor</option>
              <option value="User">Learner</option>
            </select>
          </label>
          </div>
        </div>
        <br></br>
        <input
          type="button"
          value="Sign Up"
          className="formReg submit"
          onClick={register}
        />
      </form>
    </div>
  );
};
export default Register;

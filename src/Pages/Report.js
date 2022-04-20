import React, { useState, useContext , useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Cookies from "universal-cookie";
import "./Report.css";
import Button from '@mui/material/Button';
import emailjs from '@emailjs/browser';



const Report = () => {
  

  let {user, setUser} = useContext(UserContext)
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState('');

console.log(user)
  var params = {
    name:user.username,
    reportedName: name,
    message: message
  }
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send('service_x4s2wzi', 'template_pjv54yi', params, 'y2LQSOmAxun_K2Pc-')
      .then((result) => {
          console.log(result.text);
          setSent('Your report was sent. It will be reviewed later.')
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form className = "report">
    <h1 className = "reportHeader">Submit Report</h1>
      <div className = "fields">
        <label className = "labels" htmlFor="name">Name of Instructor: </label>
        <br></br>
        <input className = "fieldText" type="text" id="name" name="name" onChange= {(e)=> setName(e.target.value)} required />
      </div>
      <p className = "reportDescription"></p>
      <div className = "messageLabel">
        <label  htmlFor="message">Reason for Report: </label>
        <br></br>
        <textarea className = "textBox" name="message" required onChange= {(e)=> setMessage(e.target.value)}/>
      </div>
      {sent == '' ? null : <p style = {{color : "#28a745"}}>{sent}</p>}
      <Button style = {{marginTop : "30px"}}variant = "contained" onClick= {sendEmail}> Report </Button>
    </form>
  );
};

export default Report;

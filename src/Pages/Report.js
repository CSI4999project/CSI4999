import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Cookies from "universal-cookie";
import "./Report.css";
import Button from '@mui/material/Button';

const Report = () => {
  
  return (
    <form className = "report">
    <h1 className = "reportHeader">Submit Report</h1>
      <div className = "fields">
        <label className = "labels" htmlFor="name">Name of Instructor: </label>
        <br></br>
        <input className = "fieldText" type="text" id="name" required />
      </div>
      <p className = "reportDescription">Explain reason for report</p>
      <div className = "messageLabel">
        <label  htmlFor="message">Message: </label>
        <br></br>
        <textarea className = "textBox" required />
      </div>
      <Button style = {{marginTop : "50px"}}variant = "contained"> Report </Button>
    </form>
  );
};

export default Report;

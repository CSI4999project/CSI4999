import React, { useState, useContext , useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Cookies from "universal-cookie";
import Button from '@mui/material/Button';
import "./Disclaimer.css";

const Disclaimer = () =>  {
    return(
        <div>
            <h1 className = "disclaimerHeader" >FAQ</h1>
            <p className = "question">What if someone makes a big trade while paper trading and tries to do the same with real money and loses big?</p>
            <p className = "answer"> &emsp; &emsp; &emsp; This platform is designed to prevent this because students will get direct feedback for each trade they place, risk management, 
            and the overall state of their portfolio from their mentor. Decreasing the chance someone makes a rookie mistake when they'
            re on their own. Disclaimers will be put in place as a warning that results in our simulation
             do not always equal to results in real life.</p>
            <p className = "question">Are we responsible for teaching people how to trade?</p>
            <p className = "answer"> &emsp; &emsp; &emsp; No, this is simply a platform that already established mentors can use to further help their students.</p>
            <p className = "question">What can be done if an Instructor is scamming/misleading students for malicious purposes?</p>
            <p className = "answer"> &emsp; &emsp; &emsp; We have a report system at the footer at our page which allows you to report instructors for malicious activity.
            Our team will then review the instance and make a final judgement</p>
            <p className = "question" >Will this application further assist cryptocurrency's negative impact on the enviorment(cryptocurrency mining)?</p>
            <p className = "answer"> &emsp; &emsp; &emsp; We understand cryptocurrencies current effect on the enviornment, it is our teams belief that cryptocurrency mining will
            be soon be a thing of the past once Ethereum 2.0 is released. This will change the majority of cryptocurrency mining from proof of work to proof
            of stake(which does not emphasize on computing power to mine cryptocurrency). </p>
            <a className = "powLink" href = "https://www.coinbase.com/learn/crypto-basics/what-is-proof-of-work-or-proof-of-stake">POW vs POS</a>
        </div>
    )
}
export default Disclaimer;
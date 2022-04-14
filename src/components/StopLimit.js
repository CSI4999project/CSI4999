import { Button, handleChange, Grid, InputLabel, FormControl, TextField, LinearProgress, makeStyles, MenuItem, Select, Typography } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import htmlparse from 'html-react-parser';
import { SingleCoin } from "../config/cryptoApi";
import { numberWithCommas } from "../components/CoinTable";
import { CryptoState } from "../CryptoContext";
import TradingBlock from "../components/TradingBlock";
import '../coinStyle.css';
const StopLimit = ({func, setExecuted}) => {
    return(
        <div>
        <p className = "desc">Stop Limit:</p>
        <TextField onChange = { (e) => {func(e.target.value)}} variant = "outlined" placeholder = "ex. 120.00" className = "transactionAmount"></TextField>
        <input className = "checkbox" onChange={(e) => setExecuted(e.target.checked)} type="checkbox"/>
        <p style = {{display : "inline", marginLeft : "5px"}}>Filled</p>
        </div>
    );
}
export default StopLimit;
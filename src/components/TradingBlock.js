import { Button, handleChange, Grid, InputLabel, FormControl, TextField, LinearProgress, makeStyles, MenuItem, Select, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import htmlparse from 'html-react-parser';
import { SingleCoin } from "../config/cryptoApi";
import { numberWithCommas } from "../components/CoinTable";
import { CryptoState } from "../CryptoContext";
import StopLimit from "./StopLimit";
import '../coinStyle.css';
const TradingBlock = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol } = CryptoState();
    const [price, displayPrice] = useState();
    const [amount, displayAmount] = useState('');
    const [fontColor, setFont] = useState("#");
    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
      };
      useEffect(() => {
        fetchCoin();
      }, []);
    const typeButton = {
    color : fontColor
  }
    const setStyle = (fontColor) => {
    displayPrice(coin?.market_data.current_price[currency.toLowerCase()]);
    setFont(fontColor);
  }

    const useVisibilityToggler = (component, visibility = false) => {
        const [visible, setVisibility] = useState(() => visibility);
        return [visible ? component : null, (v) => setVisibility ((v) => (!v))];
    }
    const [StopLimitShow, toggleVisibility] = useVisibilityToggler(<StopLimit></StopLimit>, false);
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
    return(
        <div style = {typeButton} className = "tradingBlock">
        <p className = "desc">Buy or Sell</p>
        <Button onClick = {() => {setStyle("#519259")}}  color = "primary" style = {{marginTop: "3px"}} variant="contained">Buy</Button>
        <Button onClick = {() => {setStyle("#B33030")}} color = "primary" style = {{marginLeft : "5px", marginTop: "3px"}} variant = "contained">Sell</Button>
        <Button onClick = {toggleVisibility} color = "primary" variant = "contained" style = {{marginLeft : "5px", marginTop: "3px"}}>Toggle Stop</Button>
        <FormControl fullWidth>
        {StopLimitShow}
        <p className = "desc">Price:</p>
        <TextField variant = "outlined"  placeholder = "ex: 12.00" defaultValue = {(coin?.market_data.current_price[currency.toLowerCase()])} className = "transactionAmount" onChange= {(e) => displayPrice(e.target.value)}  ></TextField>
        <p className = "desc">Amount:</p>
        <TextField variant = "outlined" placeholder = "ex. 120.00" className = "transactionAmount" onChange={(e) => displayAmount(e.target.value)}></TextField>
        <p className = "desc">Total:</p> 
        <p className = "totalEquation">(${price} x {amount}) = ${numberWithCommas((price * amount).toFixed(3))}</p>
        <Button color = "primary" variant = "contained" style = {{marginTop : "3px", width: "250px"}}>Record Order</Button>
        </FormControl>
        <p></p>
        </div>); 
    }
    export default TradingBlock;
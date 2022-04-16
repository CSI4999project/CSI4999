import { handleChange, Grid, InputLabel, FormControl, TextField, LinearProgress, makeStyles, MenuItem, Select, Typography } from "@material-ui/core";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import htmlparse from 'html-react-parser';
import { SingleCoin } from "../config/cryptoApi";
import { numberWithCommas } from "../components/CoinTable";
import { CryptoState } from "../CryptoContext";
import StopLimit from "./StopLimit";
import {UserContext} from '../context/userContext';
import '../coinStyle.css';
import { display } from "@mui/system";
const TradingBlock = () => {
    let {user, setUser} = useContext(UserContext);
    const [stopPrice, displayStopPrice] = useState(0);
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const {currency, symbol} = CryptoState();
    const [price, displayPrice] = useState();
    const [executed, setExecuted] = useState(false);
    const [amount, displayAmount] = useState('');
    const [error, setError] = useState();
    const [currencyOwned, setOwned] = useState();
    const [fontColor, setFont] = useState("#");
    const [type, setType] = useState();
    const [open, setOpen] = useState(false);
    const [plusOrMinus, setPlusOrMinus] = useState();
    const [isLoading, setLoading] = useState(true);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};
    const [visible, setVisibility] = useState(false);
    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
        setLoading(false);
      };
      useEffect(() => {
        fetchCoin();
      }, []);
    const typeButton = {
    color : fontColor,
    zIndex : 5
  }
  useEffect(()=>{
    if(isLoading == false){
      console.log(coin);
    axios.post('http://localhost:4000/Portfolio', {userID: user.id}).then((res) =>{
      let arr = [];
      (res.data).forEach((number) => arr.push([number.CURRENCY_FULLNAME, number.Currency_Amount, (number.Currency_Amount * coin?.market_data.current_price.usd)]));
      console.log(arr);
      setOwned(arr);
    })
  }
  }, [isLoading])

  
  const checkType = () => {
    if(type == 0) handleOpen();
    if(type == 1) errorMessage();
  }
  const errorMessage = () => {
    let f = 1;
    let r = 1;
    for (let i = 0; i < currencyOwned.length; i++) {
      if(currencyOwned[i][0] == coin?.id.toLowerCase()) r = 2;
    }
    if(r == 1) {setError(true); return;}
    for (let i = 0; i < currencyOwned.length; i++) {
      if(currencyOwned[i][0] == coin?.id.toLowerCase()) {
        if(Number(amount) > Number(currencyOwned[i][2])) {
          f = 2;
        }
      }
    }
    f == 2 ? setError(true) : handleOpen();
  }
    const setStyle = (fontColor) => {
    displayPrice(coin?.market_data.current_price[currency.toLowerCase()]);
    setFont(fontColor);
  }
    const useVisibilityToggler = (component, visibility = false) => {
        return [visible ? component : null, (v) => setVisibility ((v) => (!v))];
    }
    const showPrice = () => {
      if(type == true) setPlusOrMinus("-");
      if(type == false) setPlusOrMinus("+");
    }
    let totalToken = (amount/price).toFixed(6);
    const [StopLimitShow, toggleVisibility] = useVisibilityToggler(<StopLimit func = {displayStopPrice} setExecuted = {setExecuted}></StopLimit>, false);

    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />

    const axiosCall = () => {
      if(visible == false) {
        console.log('happened here')
        console.log({userID: user.id,
          Type : type,
          CurrencyName: coin?.symbol.toUpperCase(),
          DollarAmount: amount,
          Currency_price: price,
          Currency_Owned: totalToken,
          fullname: coin?.id,
          stopPrice: 0,
          executed: 1})
        axios({
          method:"POST",
          data:{
            userID: user.id,
            Type : type,
            CurrencyName: coin?.symbol.toUpperCase(),
            DollarAmount: amount,
            Currency_price: price,
            Currency_Owned: totalToken,
            fullname: coin?.id,
            stopPrice: 0,
            Filled: 1
            
          },
          url: "http://localhost:4000/coins"})
      }
      else {
        alert("run");
        console.log(stopPrice);
        axios({
          method:"POST",
          data:{
            userID: user.id,
            Type : type,
            CurrencyName: coin?.symbol.toUpperCase(),
            DollarAmount: amount,
            Currency_price: price,
            Currency_Owned: totalToken,
            fullname: coin?.id,
            stopPrice: stopPrice,
            Filled: executed
            
          },
          url: "http://localhost:4000/coins"})
          setOpen(false) 
      }
    }
    console.log(visible);
    console.log(stopPrice);
    return(
        <div style = {typeButton} className = "tradingBlock">
        <p className = "desc">Buy or Sell</p>
        <Button onClick = {() => {setStyle("#519259"); setType(0);}}  color = "success" style = {{marginTop: "3px"}} variant="contained">Buy</Button>
        <Button onClick = {() => {setStyle("#B33030"); setType(1);}} color = "error" style = {{marginLeft : "5px", marginTop: "3px"}} variant = "contained">Sell</Button>
        <Button onClick = {toggleVisibility} color = "primary" variant = "contained" style = {{marginLeft : "5px", marginTop: "3px"}}>Toggle Stop</Button>
        <FormControl fullWidth>
        {StopLimitShow}
        <p className = "desc">Price:</p>
        <TextField variant = "outlined"  placeholder = "ex: 12.00" defaultValue = {(coin?.market_data.current_price[currency.toLowerCase()])} className = "transactionAmount" onChange= {(e) => displayPrice(e.target.value)}  ></TextField>
        <p className = "desc">Amount:</p>
        <TextField variant = "outlined" placeholder = "ex. 120.00" className = "transactionAmount" onChange={(e) => displayAmount(e.target.value)}></TextField>
        <p className = "desc">Total:</p> 
        <p className = "totalEquation">(${amount} / ${price}) = {(amount / price).toFixed(6)} {coin?.symbol.toUpperCase()}</p>
        <Button onClick = {() => {checkType(); showPrice();}} color = "primary" variant = "contained" style = {{marginTop : "3px", width: "250px"}}>Record Order</Button>
        </FormControl>
        <p>{stopPrice}</p>
        <Modal 
         open = {open}
         onClose = {handleClose}>
         <div className = "popUp">
         <h2>Are you sure you would like to record this order?</h2>
         <Button onClick = {() => {axiosCall(); setOpen(false);}} color = "primary" style = {{marginTop: "3px"}} variant="contained">Yes</Button>
         <Button onClick = {() => {setOpen(false)}} color ="primary" style = {{marginLeft: "10px"}} variant="contained">Cancel</Button>
         <p>{plusOrMinus}{(amount / price).toFixed(6)} {coin?.symbol.toUpperCase()}</p>
         </div>
         </Modal>
         <Modal 
         open = {error}>
         <div className = "popUp">
         <h2>The amount you are attempting to sell exceeds available holdings</h2>
         <Button onClick = {() => {setError(false)}} color ="primary" style = {{marginLeft: "10px"}} variant="contained">Cancel</Button>
         </div>
         </Modal>


        </div>); 
    }
    export default TradingBlock;
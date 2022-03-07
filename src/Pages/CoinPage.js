import { Button, handleChange, Grid, InputLabel, FormControl, TextField, LinearProgress, makeStyles, MenuItem, Select, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import htmlparse from 'html-react-parser';
import { SingleCoin } from "../config/cryptoApi";
import { numberWithCommas } from "../components/CoinTable";
import { CryptoState } from "../CryptoContext";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import '../coinStyle.css';


const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const [price, displayPrice] = useState('');
  const [amount, displayAmount] = useState('');
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const useStyles = makeStyles((theme) => ({
  }));
  const typeButton = {
    borderColor : "",
    backgroundColor :  ""
  }
  const classes = useStyles();

  const App = () => (
    <TradingViewWidget
      symbol={coin?.symbol + "usd"}
      autosize
      theme={Themes.DARK}
      locale="en"
    />
  );
  const transactionType = "Buy";


  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className = "page">
    <div className = "description">
      <div className = "coin">
        <img
          className = "coinImage"
          src={coin?.image.large}
          alt={coin?.name}/>
        <h3 className = "coinHeader">
          {coin?.name}
        </h3>
        <p className = "coinDescription" style = {{
        }}>
          {htmlparse("" + coin?.description.en.split(". ")[0])}.
        </p>
        <div>
            <h3 className = "stats">
              Rank:
            </h3>
            <h3 className = "statFacts"
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </h3>
          <span style={{ display: "flex" }}>
            <h3 className = "stats">
              Current Price:
            </h3>
            <h3 className = "statFacts"
            >
              {symbol}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </h3>
          </span>
          <span style={{ display: "flex" }}>
            <h3 className = "stats">
              Market Cap: 
            </h3>
            <h3 className = "statFacts"
            >
              {symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
              )}
            </h3>
          </span>
        </div>
      </div>
      <div className = "chartWidget">
      <App></App>
      </div>
   </div>
    <div style = {typeButton} className = "tradingBlock">
   <h2 className = "tradeHeader">Trade</h2>
   <p className = "desc">Buy or Sell</p>
   <Button onClick = {() => {typeButton.backgroundColor = "red"}} style = {{marginTop: "3px"}} variant="contained" color="Success">Buy</Button>
   <Button style = {{marginLeft : "5px", marginTop: "3px"}} variant = "contained" color = "Error">Sell</Button>
   <p className = "desc">Type of Order</p>
   <FormControl fullWidth>
    <Select
      className = "transactionType"
      variant = "outlined"
      label = "limit"
      autoWidth>
      <MenuItem value = {"Limit"}> Limit</MenuItem>
      <MenuItem value = {"Stop-Limit"}>Stop Limit</MenuItem>
    </Select>
   <p className = "desc">Price:</p>
   <TextField variant = "outlined"  placeholder = "ex: 12.00" className = "transactionAmount" onChange= {(e) => displayPrice(e.target.value)}  autoWidth></TextField>
   <p className = "desc">Amount:</p>
   <TextField variant = "outlined" placeholder = "ex. 120.00" className = "transactionAmount" onChange={(e) => displayAmount(e.target.value)} autoWidth></TextField>
   <p className = "desc">Total</p> 
   <p className = "totalEquation">(${price} x ${amount}) = ${numberWithCommas((price * amount).toFixed(3))}</p>
   <Button variant = "contained" style = {{marginTop : "3px"}}>Place Order</Button>
   </FormControl>
   <p></p>
    </div>  
   </div>
  );
};

export default CoinPage;
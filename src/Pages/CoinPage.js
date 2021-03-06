import { Button, handleChange, Grid, InputLabel, FormControl, TextField, LinearProgress, makeStyles, MenuItem, Select, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import htmlparse from 'html-react-parser';
import { SingleCoin } from "../config/cryptoApi";
import { numberWithCommas } from "../components/CoinTable";
import { CryptoState } from "../CryptoContext";
import TradingBlock from "../components/TradingBlock";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import '../coinStyle.css';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, []);
  const useStyles = makeStyles((theme) => ({
  }));
  const classes = useStyles();
  const App = () => (
    <TradingViewWidget
      autosize
      symbol={coin?.symbol + "usd"}
      theme={Themes.DARK}
      locale="en"
    />
  );


  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className = "page">
    <div className = "description">
      <div className = "coin">
        <img
          className = "coinImage"
          style={{textAlign:"center"}}
          src={coin?.image.large}
          alt={coin?.name}/>
        <h1 className = "coinHeader" style={{textAlign:"center"}}> 
          {coin?.name}
        </h1>
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
   <TradingBlock></TradingBlock> 
   </div>
  );
};

export default CoinPage;
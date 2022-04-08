import React, {useState, useEffect, useContext} from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { LinearProgress } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Container from "@material-ui/core/Container"
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { findByDisplayValue } from "@testing-library/react";
import { Pagination } from "@mui/material";
import { numberWithCommas } from "../components/CoinTable";
import TradeHistory from "../components/TradeHistory";
import { PortfolioPrices} from "../config/cryptoApi";
import {UserContext} from '../context/userContext';




const PortfolioPage = () => {
let {user, setUser} = useContext(UserContext);
const [portfolioList, setPortfolioList] = useState([]);
const [tradeHistory, setTradeHistory] = useState([]);
const [namesArray, setNames] = useState([]);
const [totalBalance, setTotalBalance] = useState(0);
const [isLoading, setLoading] = useState(true);
const delay = ms => new Promise(res => setTimeout(res, ms));
let array = [];


useEffect(() =>{
    Axios({
      method:"POST",
      data:{
        userID: user.id
      },
      url: "http://localhost:4000/Portfolio"}).then((response) =>{
        console.log(response.data);
  setPortfolioList(response.data);
  const doubled = (response.data).forEach((number) => array.push(number.CURRENCY_FULLNAME));
  }).then((res) => {
    Axios({
      method:"GET",
      url: `https://api.coingecko.com/api/v3/simple/price?ids=${array}&vs_currencies=usd`}).then(response =>{
        console.log(response.data);
        setNames(response.data);
        setLoading(false);
  })
    })
}, [])

useEffect(() =>{
  async function fetchName(){
    var coinList = [];
    var total = 0;
    Axios.post("http://localhost:4000/Portfolio", {userID: user.id}).then(async (coins) =>{
      
      const doubled = (coins.data).forEach((number) => coinList.push([number.CURRENCY_FULLNAME, number.Currency_Amount]));
      var names = coinList.map(function(value,index) { return value[0]; });
      let price = await Axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${names}&vs_currencies=usd`)
      coinList.sort((a, b) => a[0].localeCompare(b[0]))
      if(coinList.length > 0){
        for(let i = 0; i< coinList.length; i++){
          total += coinList[i][1] * price.data[coinList[i][0]].usd
        }
        setTotalBalance(total)
      }
      
    })
    
    
    
  }
  fetchName();
}, [])
const useStyles = makeStyles((theme) => ({
  gridClassName: {
    boxShadow: "2px 2px 4px rgb(255 238 51 / 100%)",
    borderRadius: "10px"
  
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "white",
    },
  },
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
  row2: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    borderColor: "black"
    },
  boxFont: {
    fontSize: "20px", 
    color: "green",
    fontWeight: "bold"
  },
  boxFont2: {
    fontSize: "20px", 
    fontWeight: "bold"
  },

  boxFontUnder: {
    fontSize: "15px", 
    fontWeight: "bold"
  },

  tableHeadFont: {
    fontSize: "15px", 
    fontWeight: "bold",
    color:"white"
  },

  tableCellFont: {
    fontSize: "15px",
    color: "white",
    borderColor: "black"
  },
  tableCellFont2: {
    fontSize: "15px",
    color: "green",
    borderColor: "black"
  }
}));
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  elevation: 8

}));
 const classes = useStyles();
 if (isLoading) {
  return <div className="App">Loading...</div>;
}
  return (
        <div>
    <Container style={{ textAlign: "center" }}>
      <Typography variant="h4" style={{ padding: 30 }}>
          Portfolio
        </Typography>
        <div style={{margin: 30}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={2}>
            <Item className={classes.gridClassName} style={{padding: 15}}>
              <div className={classes.boxFont2}>${totalBalance.toFixed(2)}</div>
              <div className={classes.boxFontUnder}>Total Balance</div>
          </Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item className={classes.gridClassName} style={{padding: 15}}>
              <div className={classes.boxFont}>+$32.90</div>
              <div className={classes.boxFontUnder}>24h portfolio change</div>
          </Item>
          </Grid>
          <Grid item xs={2}>
            <Item className={classes.gridClassName} style={{padding: 15}}>
              <div className={classes.boxFont}>+$69.42</div>
              <div className={classes.boxFontUnder}>Total Profit Loss</div>
          </Item>
          </Grid>
          </Grid>
      </div>
    <TableContainer style={{margin: 30}} component={Paper}>
      <Table sx={{minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.row2}>
            <TableCell className={classes.tableHeadFont}>Coin</TableCell>
            <TableCell className={classes.tableHeadFont} align="right">Price</TableCell>
            <TableCell className={classes.tableHeadFont} align="right">USD</TableCell>
            <TableCell className={classes.tableHeadFont} align="right">Holdings</TableCell>
            <TableCell className={classes.tableHeadFont} align="right">24h</TableCell>
            <TableCell className={classes.tableHeadFont} align="right">P/L</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolioList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className={classes.row}
            >
              <TableCell className={classes.tableCellFont} component="th" scope="row">
                {row.CURRENCY_NAME}
              </TableCell>
              {/* //{array.map((reforwardRef))} */}
              <TableCell className={classes.tableCellFont} align="right">${numberWithCommas((namesArray[row.CURRENCY_FULLNAME].usd).toFixed(2))}</TableCell>
              <TableCell className={classes.tableCellFont} align="right">${numberWithCommas(((namesArray[row.CURRENCY_FULLNAME].usd).toFixed(2) * row.Currency_Amount).toFixed(2))}</TableCell>
              <TableCell className={classes.tableCellFont} align="right">{row.Currency_Amount}</TableCell>
              <TableCell className={classes.tableCellFont2} align="right">2.5%</TableCell>
              <TableCell className={classes.tableCellFont} align="right">${((((namesArray[row.CURRENCY_FULLNAME].usd).toFixed(2) * row.Currency_Amount).toFixed(2)) - row.DOLLAR_AMOUNT).toFixed(2) > 0 ? "+"+(numberWithCommas(((((namesArray[row.CURRENCY_FULLNAME].usd).toFixed(2) * row.Currency_Amount).toFixed(2)) - row.DOLLAR_AMOUNT).toFixed(2))) : (numberWithCommas(((((namesArray[row.CURRENCY_FULLNAME].usd).toFixed(2) * row.Currency_Amount).toFixed(2)) - row.DOLLAR_AMOUNT).toFixed(2)))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          color="primary"
          count={10}
          classes={{ ul: classes.pagination }}
          // onChange={(_, value) => {
          //    setPage(value);
          //   window.scroll(0, 450);
          // }}
        />
    </Container>
    <div style={{margin: 30}}>
    <Typography variant="h4" style={{ textAlign: "center", padding: 30 }}>
          Trade History
        </Typography>
<TradeHistory></TradeHistory>

    </div>
    </div>
        );
 
}

export default PortfolioPage;

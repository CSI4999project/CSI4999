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
import StopShow from '../components/StopShow';


import axios from "axios";
import JoinClass from "../components/JoinClass";
import {useLocation} from 'react-router-dom';


const PortfolioPage = () => {
let {user, setUser} = useContext(UserContext);
const [isMember, setMember] = useState([])
const [portfolioList, setPortfolioList] = useState([]);
const [tradeHistory, setTradeHistory] = useState([]);
const [namesArray, setNames] = useState([]);
const [totalBalance, setTotalBalance] = useState(0);
const [totalProfitLoss, setTotalProfitLoss] = useState(0);
const [isLoading, setLoading] = useState(true);
const [page, setPage] = useState(1);
const [userName, setUserName] = useState('');
const delay = ms => new Promise(res => setTimeout(res, ms));
let array = [];

const location = useLocation();
console.log('this is props')
console.log()
const id = user.type == 'Instructor' ? location.state.id : user.id;

useEffect(() =>{
    Axios({
      method:"POST",
      data:{
        userID: id
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
    var totalPL = 0;
    Axios.post("http://localhost:4000/Portfolio", {userID: id}).then(async (coins) =>{
      
      const doubled = (coins.data).forEach((number) => coinList.push([number.CURRENCY_FULLNAME, number.Currency_Amount, number.DOLLAR_AMOUNT]));
      var names = coinList.map(function(value,index) { return value[0]; });
      let price = await Axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${names}&vs_currencies=usd`)
      coinList.sort((a, b) => a[0].localeCompare(b[0]))
      if(coinList.length > 0){
        for(let i = 0; i< coinList.length; i++){
          total += coinList[i][1] * price.data[coinList[i][0]].usd
          totalPL += ((coinList[i][1] * price.data[coinList[i][0]].usd) - coinList[i][2])
        }
        setTotalBalance(total)
        setTotalProfitLoss(totalPL)
      }
      
    })
    
  }
  fetchName();
}, [])


useEffect(() =>{
  axios.post('http://localhost:4000/isMember', {userID: id}).then((res) =>{
    setMember(res.data)
  });

  axios.post('http://localhost:4000/userName', {userID: id}).then((res) =>{
    console.log(res.data.USER_NAME)
    setUserName(res.data[0].USER_NAME);
  })
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

if(isMember.length == 0 && user.type !== 'Instructor'){
  return <JoinClass id= {user.id}></JoinClass>
} else{
  return (
    <div>
<Container style={{ textAlign: "center" }}>
  <Typography variant="h4" style={{ padding: 30 }}>
    {user.type == 'Instructor' ? userName[0].toUpperCase() + userName.toLowerCase().slice(1): user.username[0].toUpperCase() + user.username.toLowerCase().slice(1)}'s Portfolio
    </Typography>
    <div style={{margin: 30}}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={2}>
        <Item className={classes.gridClassName} style={{padding: 15}}>
          <div className={classes.boxFont2}>${numberWithCommas(totalBalance.toFixed(2))}</div>
          <div className={classes.boxFontUnder}>Total Balance</div>
      </Item>
      </Grid>
      <Grid item xs={2}>
        <Item className={classes.gridClassName} style={{padding: 14}}>
          <div className={classes.boxFont} style={{color: totalProfitLoss.toFixed(2) > 0 ? "rgb(14, 203, 129)" : "red"}}> ${numberWithCommas(totalProfitLoss.toFixed(2))}</div>
          <div className={classes.boxFontUnder}>All Time Profit Loss</div>
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
        <TableCell className={classes.tableHeadFont} align="right">P/L</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {portfolioList.slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => (
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
          <TableCell className={classes.tableCellFont} style={{color: ((((namesArray[row.CURRENCY_FULLNAME].usd).toFixed(2) * row.Currency_Amount).toFixed(2)) - row.DOLLAR_AMOUNT).toFixed(2) > 0 ? "rgb(14, 203, 129)" : "red"}} align="right">${((((namesArray[row.CURRENCY_FULLNAME].usd).toFixed(2) * row.Currency_Amount).toFixed(2)) - row.DOLLAR_AMOUNT).toFixed(2) > 0 ? "+"+(numberWithCommas(((((namesArray[row.CURRENCY_FULLNAME].usd).toFixed(2) * row.Currency_Amount).toFixed(2)) - row.DOLLAR_AMOUNT).toFixed(2))) : (numberWithCommas(((((namesArray[row.CURRENCY_FULLNAME].usd).toFixed(2) * row.Currency_Amount).toFixed(2)) - row.DOLLAR_AMOUNT).toFixed(2)))}</TableCell>
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
      count={Math.ceil(portfolioList.length / 10)}
      classes={{ ul: classes.pagination }}
      onChange={(_, value) => {
         setPage(value);
        //window.scroll(0, 450);
      }}
    />
</Container>
<div style={{margin: 30}}>
<Typography variant="h4" style={{ textAlign: "center", padding: 30 }}>
      Trade History
    </Typography>
<TradeHistory id={id}></TradeHistory>

<Typography variant="h4" style={{ textAlign: "center", padding: 30 }}>
          Pending
        </Typography>
        <StopShow id ={id}></StopShow>

</div>
</div>
    );
}
  
 
}

export default PortfolioPage;

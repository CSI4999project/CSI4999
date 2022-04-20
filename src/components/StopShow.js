import React, {useState, useEffect, useContext} from "react";
import Button from '@mui/material/Button';
import Axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Container from "@material-ui/core/Container"
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { findByDisplayValue } from "@testing-library/react";
import { Pagination } from "@mui/material";
import { numberWithCommas } from "./CoinTable";
import {UserContext} from '../context/userContext';


const TradeHistory = () => {

  let {user, setUser} = useContext(UserContext);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [page, setPage] = useState(1);
  const axiosCall = (row) => {
      console.log(row);
      Axios({
        method:"GET",
        url: `https://api.coingecko.com/api/v3/simple/price?ids=${row.CURRENCY_FULLNAME}&vs_currencies=usd`}).then(res =>{
          console.log()
          Axios({
            method:"POST",
            data:{
              TRANSACTION_ID: row.TRANSACTION_ID,
              userID: row.USER_ID,
              CURRENCY_NAME: row.CURRENCY_NAME,
              DOLLAR_AMOUNT: row.DOLLAR_AMOUNT,
              CURRENCY_PRICE : row.CURRENCY_PRICE,
              Currency_Amount : row.Currency_Amount,
              TYPE: row.Type,
              FULLNAME: row.CURRENCY_FULLNAME,
              Filled: 1,
              STOP_LIMIT: row.STOP_LIMIT,
              PRICE_AT_EXECUTION: res.data[row.CURRENCY_FULLNAME].usd
    
            },
            url: "http://localhost:4000/Portfolio4"})
        }).then((res) => {
          window.location.reload();
        })
    
  }
  useEffect(() =>{
    Axios({
      method:"POST",
      data:{
        userID: user.id
      },
      url: "http://localhost:4000/Portfolio3"}).then((response) =>{
  console.log(response.data);
  setTradeHistory(response.data);
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
        head: {
          backgroundColor: "#222831",
          cursor: "pointer"
          },
          kms: {
            color: "white",
            borderColor: "black"
          },
        headFont: {
          color: "#D4D4D4",
          fontWeight: "bold"
        },
      }));
      const classes = useStyles();

    return (
      <div>
        <Container>
        <TableContainer component={Paper}>
        <Table sx={{minWidth: 350 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow className={classes.head}>
              <TableCell className={classes.headFont} >Date</TableCell>
              <TableCell className={classes.headFont} align="right">Coin</TableCell>
              <TableCell className={classes.headFont} align="right">Transaction</TableCell>
              <TableCell className={classes.headFont} align="right">Token Price</TableCell>
              <TableCell className={classes.headFont} align="right">Transaction Amount</TableCell>
              <TableCell className={classes.headFont} align="right">Total</TableCell>
              <TableCell className={classes.headFont} align="right">Stop Limit</TableCell>
              <TableCell className={classes.headFont} align="right">Execute?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {tradeHistory.slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => (
              <TableRow
                key={row.name}
                sx={{ border: "2px solid black", '&:last-child td, &:last-child th': { border: 0 } }}
                className={classes.row}
              >
                <TableCell className={classes.kms} component="th" scope="row">
                  4/4/2022
                </TableCell>
                <TableCell className={classes.kms} align="right">{row.CURRENCY_NAME}</TableCell>
                <TableCell className={classes.kms} align="right">{row.Type === "0" ? "Buy" : "Sell"}</TableCell>
                <TableCell className={classes.kms} align="right">{numberWithCommas((Number(row.CURRENCY_PRICE)).toFixed(2))}</TableCell>
                <TableCell className={classes.kms} align="right">{row.Currency_Amount}</TableCell>
                <TableCell className={classes.kms} align="right">${numberWithCommas(row.DOLLAR_AMOUNT)}</TableCell>
                <TableCell className={classes.kms} align="right">{row.STOP_LIMIT}</TableCell>
                <TableCell className={classes.kms} align="right"><Button onClick = {() => {axiosCall(row)}}>Execute</Button></TableCell>
                
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
          count={Math.ceil(tradeHistory.length/10)}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
             setPage(value);
            
          }}
        />
        </Container>
     </div>
    );



}

export default TradeHistory;
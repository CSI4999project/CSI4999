import React, {useState, useEffect, useContext} from "react";
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
import { numberWithCommas } from "../components/CoinTable";
import TradeHistory from "../components/TradeHistory";
import { SingleCoin } from "../config/cryptoApi";
import {UserContext} from '../context/userContext';



const PortfolioPage = () => {
  let {user, setUser} = useContext(UserContext);
const [portfolioList, setPortfolioList] = useState([]);
const [tradeHistory, setTradeHistory] = useState([]);
const [coin, setCoin] = useState();

const array = ["ethereum", "bitcoin"];


const fetchCoin = async () => {
  const { data } = await Axios.get(SingleCoin('bitcoin'));
  setCoin(data);
};
useEffect(() => {
  fetchCoin();
}, []);

useEffect(() =>{
    Axios({
      method:"POST",
      data:{
        userID: user.id
      },
      url: "http://localhost:4000/Portfolio"}).then((response) =>{
  console.log(response.data);
  setPortfolioList(response.data);
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
              <div className={classes.boxFont2}>$1,030</div>
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
              <TableCell className={classes.tableCellFont} align="right">id</TableCell>
              <TableCell className={classes.tableCellFont} align="right">${numberWithCommas(row.DOLLAR_AMOUNT)}</TableCell>
              <TableCell className={classes.tableCellFont} align="right">{row.Currency_Amount}</TableCell>
              <TableCell className={classes.tableCellFont2} align="right">2.5%</TableCell>
              <TableCell className={classes.tableCellFont} align="right">idkyet</TableCell>
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

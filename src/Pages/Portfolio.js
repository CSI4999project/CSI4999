import React from "react";
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Ethereum', '$ 3,146.89', '2.5%', '0.145567 ETH', '+$5.05'),
  createData('Cardano', '$ 1.10', '3.4%', '137.45 ADA', '+$12.07'),
  createData('Bitcoin', '$ 44,223', '2%', '0.005433 BTC', '+$6.67'),
  createData('Solana', '$ 103.57', '3%', '12.06 SOL', '+$4.45'),
  createData('xrp', '$ 0.83', '12%', '498.456 XRP', '+$27.56'),
];
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
    color: "white"
  },
  tableCellFont2: {
    fontSize: "15px",
    color: "green"
  }
}));
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  elevation: 8

}));

export default function BasicTable() {
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
          <TableRow className={classes.row}>
            <TableCell className={classes.tableHeadFont}>Coin</TableCell>
            <TableCell className={classes.tableHeadFont} align="right">Price</TableCell>
            <TableCell className={classes.tableHeadFont} align="right">24h</TableCell>
            <TableCell className={classes.tableHeadFont} align="right">Holdings</TableCell>
            <TableCell className={classes.tableHeadFont} align="right">P/L</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className={classes.row}
            >
              <TableCell className={classes.tableCellFont} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell className={classes.tableCellFont} align="right">{row.calories}</TableCell>
              <TableCell className={classes.tableCellFont2} align="right">{row.fat}</TableCell>
              <TableCell className={classes.tableCellFont} align="right">{row.carbs}</TableCell>
              <TableCell className={classes.tableCellFont} align="right">{row.protein}</TableCell>
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
          //   // setPage(value);
          //   window.scroll(0, 450);
          // }}
        />
    </Container>
    </div>
  );
}



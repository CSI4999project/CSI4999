import {
  Container,
  TextField,
  Typography,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
  createTheme,
  Pagination,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/cryptoApi";
import { CryptoState } from "../CryptoContext";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "white",
      },
    },
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: "white",
          },
        },
      },
    },
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18 }}>
          Cryptocurrency prices by market cap
        </Typography>

        <TextField
          //sx={{ input: { color: 'white' } }}
          label="Search"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24 Hour Change", "Market Cap"].map(
                    (head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        onClick={() => navigate.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color: "white",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "white" }}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div style={{ color: "white" }}>
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </div>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          <div style={{ color: "white" }}>
                            {symbol}{" "}
                            {numberWithCommas(row.market_cap.toString())}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          color="primary"
          count={(handleSearch()?.length / 10).toFixed(0)}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinTable;

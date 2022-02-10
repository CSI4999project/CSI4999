import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import TrackerPage from "./Pages/TrackerPage";
import CoinPage from "./Pages/CoinPage";
import TradingRulesInput from "./components/TradingRulesInput";
import { makeStyles } from "@mui/styles";
import { Routes } from "react-router-dom";

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a", //#14161a
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Routes>
          <Route path="/CSI4999" element={<TrackerPage />} exact />
          <Route path="/coins/:id" element={<CoinPage />} />
          <Route path="/inputform" element={<TradingRulesInput />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

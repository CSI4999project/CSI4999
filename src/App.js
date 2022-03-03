import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import TrackerPage from "./Pages/TrackerPage";
import CoinPage from "./Pages/CoinPage";
import Portfolio from "./Pages/Portfolio";
import { makeStyles } from "@mui/styles";
import { Routes } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
      <Navbar />
        <Routes>
          <Route path="/CSI4999" element={<TrackerPage />} exact />
          <Route path="/coins/:id" element={<CoinPage />} />
          <Route path="/portfolio" element={<Portfolio />} exact/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

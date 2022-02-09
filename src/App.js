import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import TrackerPage from "./Pages/TrackerPage";
import CoinPage from "./Pages/CoinPage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Me from "./Pages/Me/me";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import '../src/Pages/Login/Login.css'
import { UserContext } from "./context/userContext";
import Cookies from 'universal-cookie';

function App() {
  //Get current user from COOKIES
  const cookies= new Cookies()
  const [user, setUser] = useState(cookies.get('user'))
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a", //#14161a
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();
  
  return (
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
      
        <div className={classes.App}>
          <Routes>
              {/* IF USER IS LOGGED IN RENDER A PAGE ELSE REDIRECT TO A LINK */}
            <Route path="/CSI4999" element={user ? <TrackerPage/> : <Navigate to='/login'/>} exact />
            <Route path="/coins/:id" element={user? <CoinPage/> : <Navigate to='/login'/>} />
            <Route path="login" element={user ? <Navigate to='/CSI4999'/> : <Login/>} />
            <Route path="register" element={user? <Navigate to='/CSI4999'/>  : <Register/>} />
            <Route path="me" element={user ? <Me /> : <Navigate to='/login'/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}


export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import TrackerPage from "./Pages/TrackerPage";
import CoinPage from "./Pages/CoinPage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Portfolio from "./Pages/Portfolio";
import Me from "./Pages/Me/me";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import '../src/Pages/Login/Login.css'
import { UserContext } from "./context/userContext";
import axios from 'axios'
import Navbar from './components/Navbar';


function App() {
  //Get current user from COOKIES
  const [user, setUser] = useState('')
  const [isLoading, setLoading] = useState(true);
  console.log(user + 'this is user')
  useEffect( () =>{
    axios({
      method:"GET",
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {
      setUser(res.data)
      setLoading(false)}
      )
  }, [])
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a", //#14161a
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();
  
  if(isLoading){
    return <div>Loading...</div>;
  }
  return (
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
      
        <div className={classes.App}>
        <Navbar />
          <Routes>
              {/* IF USER IS LOGGED IN RENDER A PAGE ELSE REDIRECT TO A LINK */}
            <Route path="/me" element={user ? <Me /> : <Navigate to='/login'/>} />
            <Route path="/CSI4999" element={user ? <TrackerPage/> : <Navigate to='/login'/>} exact />
            <Route path="/coins/:id" element={user? <CoinPage/> : <Navigate to='/login'/>} />
            <Route path="login" element={user ? <Navigate to='/CSI4999'/> : <Login/>} />
            <Route path="register" element={user? <Navigate to='/CSI4999'/>  : <Register/>} />
            <Route path="/portfolio" element={user ? <Portfolio /> : <Navigate to='/login'/>} exact/>
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}


export default App;





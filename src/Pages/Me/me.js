import {React, useContext }from 'react';
import { UserContext } from '../../context/userContext';
import '../Me/me.css'
import axios from 'axios'

const Me = () => {
    //get currently logged in user
    let {user, setUser} = useContext(UserContext)
    

    //logout function delete cookie session and redirect to login
    const logout = async () =>{
      axios({
        method: "POST",
        withCredentials: true,
        url: "http://localhost:4000/logout",
      }).then((res) => {
        setUser('')
        navigate('/login')
      });
        
    }
  return (
    
    <div>
        <div>
            <button className='button' onClick={logout}> Logout</button>
        </div>
        
        {JSON.stringify(user)}
    </div>
  )
};

export default Me;

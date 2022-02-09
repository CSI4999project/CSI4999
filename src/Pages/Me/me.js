import {React, useContext }from 'react';
import { UserContext } from '../../context/userContext';
import '../Me/me.css'
import { useNavigate } from "react-router-dom";

const Me = () => {
    //get currently logged in user
    let {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()

    //logout function delete cookie session and redirect to login
    const logout = async () =>{
        setUser('')
        document.cookie = "user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        navigate('/login')
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

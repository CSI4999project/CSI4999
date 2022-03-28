import React, {useState} from 'react';
import "./Register.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const navigate = useNavigate();
  // States of email and password
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [userName, setUserName] = useState('')
  let [errorMessage, setError] = useState('')
  let [userType, setUserType] = useState('Instructor')

  var register = () =>{
    axios({
      method:"POST",
      data: {
        email: email,
        password: password,
        username: userName,
        usertype: userType,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) =>{
        if(res.data ==='User With Email Already Exists'){
            setError('User With Email Already Exists')
            console.log(res)
        } else{
            navigate('/login')
        }
    }
    )
  }
  return (
    <div className='center'>
      <h1>Register</h1>
      <form >
        {errorMessage === '' ? null : <p>{errorMessage}</p>}
        <br></br>
        <label >
        <br></br>
        <h3>Email:</h3>
        <br></br>
          <input className='formReg' type="text" name="email" onChange={(e)=> setEmail(e.target.value)}/>
        </label>
        <br></br>
        <label >
        <br></br>
        <h3>Username:</h3>
        <br></br>
          <input className='formReg' type="text" name="username" onChange={(e)=> setUserName(e.target.value)}/>
        </label>
        <br></br>
        <label>
        <br></br>
        <h3>Password:</h3>
          <br></br>
          <input className='formReg' type="password" name="password" onChange={(e)=> setPassword(e.target.value)}/>
        </label>
        <br></br>

        <label >
          <br></br>
          <h3>Sign Up as:</h3>
          <br></br>
                <select className='formReg' id="Type" onChange={(e)=>setUserType(e.target.value)}>
                  <option value="Instructor">Instructor</option>
                  <option value="User">Learner</option>
               </select>
          </label>
        <br></br>


        <input type="button" value="Sign Up"  className='formReg submit' onClick={register}/>
    </form>

    
    </div>
  )
};

export default Register;
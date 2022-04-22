import React, {useState} from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JoinClass = (props) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const join = () => {
    axios.post('http://localhost:4000/joinClass', {id: props.id, code: code}).then((res) =>{
      if(res.data == 'not found'){
        setError('Code Incorrect')
      } else{
        setError('')
        navigate('/Tracker')
      }
    })
  }
  return (
    <div>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ padding: 30 }}>
          Join Class
        </Typography>
        <Typography  style={{ padding: 30 }}>
          {error}
        </Typography>
        <TextField
          onChange= {(e) => setCode(e.target.value)}
          sx={{ input: { color: "white" } }}
          label="Enter Class Code"
          variant="outlined"
          style={{ marginBottom: 20, width: "40%", backgroundColor: "#14161a" }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
        />
      </Container>
      <Container style={{ textAlign: "center" }}>
        <button
          style={{ backgroundColor: "white", fontSize: "22px", padding: "5px", borderColor: 'white' }}
          onClick = {()=> join()}
        >
          Submit
        </button>
      </Container>
    </div>
  );
};

export default JoinClass;

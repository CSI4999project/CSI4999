import React, {useState, useEffect, useContext} from "react";
import Axios from "axios";
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
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/userContext";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import '../Pages/teacher.css'
const TeacherPage = () => {
    const navigate = useNavigate();
    const [studentsList, setStudentsList] = useState([]);
    let {user, setUser} = useContext(UserContext)
    let [code, setCode] = useState('')
    let [studentLimit, setLimit] = useState(0)
    let [newStudentLimit, setNewLimit] = useState(studentLimit)
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //This is the Axios call using that url. The /Students is important here this lets Axios know were grabbing
    //the get request we made in server.js
    //All im doing is getting the response, console logging it, then putting it in setStudentsList array that i made above.


    const updateLimit = () =>{
      Axios.post("http://localhost:4000/updateLimit", {id:user.id, limit: newStudentLimit}).then((res)=>{
        window.location.reload();
      })
    }
    useEffect(() =>{
      
        
        Axios.post("http://localhost:4000/Students", {id: user.id}).then((response) =>{
        setStudentsList(response.data);
        })
    }, [])

    useEffect(()=>{
      Axios.post('http://localhost:4000/getLimitNumber', {id: user.id}).then((res)=>{
        setLimit(res.data.PARTY_LIMIT)
        setNewLimit(res.data.PARTY_LIMIT)
      })
    },[])
    useEffect(() =>{
      Axios.post('http://localhost:4000/getCode', {id: user.id}).then((res) =>{
        setCode(res.data)
      })
    }, [])


    const deleteUser = async (id) => {
      Axios.post('http://localhost:4000/deleteUser', {userID: id}).then((res) =>{
        window.location.reload();
      })
    };

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
      }
    }));
    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      elevation: 8
    
    }));
    
      const classes = useStyles();
      const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#222831',
        color:'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


      const textStyle = makeStyles({
        input: {
          color: "blue",
          background: "white"
        }
      });
      return (
        <div>
        <Container style={{ textAlign: "center" }}>
          <Typography variant="h4" style={{ padding: 30 }}>
              My Students
          </Typography>
          <Typography  style={{float: "right"}}>
              Class Code: {code} 
            </Typography>
            <Typography  style={{float: "left"}}>
              Current Number of Students: {studentsList.length} 
            </Typography>
            
        <TableContainer style={{margin: 30}} component={Paper}>
          <Table sx={{minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.row}>
                <TableCell className={classes.tableHeadFont}>Username</TableCell>
                <TableCell className={classes.tableHeadFont} align="right">First Name</TableCell>
                <TableCell className={classes.tableHeadFont} align="right">Last Name</TableCell>
                <TableCell className={classes.tableHeadFont} align="right">Email</TableCell>
                <TableCell className={classes.tableHeadFont} align="right">Function</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsList.slice((page - 1) * 10, (page - 1) * 10 + 10).map((val) => (
                <TableRow
                  key={studentsList.val}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className={classes.row}
                >
                  <TableCell className={classes.tableCellFont} component="th" scope="row" onClick = {() => navigate('/Portfolio', {state: {id: val.USER_ID}})}>{val.USER_NAME}</TableCell>
                  <TableCell className={classes.tableCellFont} align="right" onClick = {() => navigate('/Portfolio', {state: {id: val.USER_ID}})}>{val.USER_FIRSTNAME}</TableCell>
                  <TableCell className={classes.tableCellFont} align="right" onClick = {() => navigate('/Portfolio', {state: {id: val.USER_ID}})}>{val.USER_LASTNAME}</TableCell>
                  <TableCell className={classes.tableCellFont} align="right" onClick = {() => navigate('/Portfolio', {state: {id: val.USER_ID}} )}>{val.USER_EMAIL}</TableCell>
                  <TableCell className={classes.tableCellFont} align="right" >
                    <button onClick ={() => navigate('/Chat',{state: {name: val.USER_NAME}})}>Chat</button> | <button onClick ={() => deleteUser(val.USER_ID)}>Delete</button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        </TableContainer>
        <Typography  style={{float: "Right"}}>
              <Button color = "success" style = {{marginBottom: "10px"}} variant="contained" onClick={handleOpen}> Settings</Button>
        </Typography>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
              <Typography style = {{marginBottom: "20px"}} id="modal-modal-title" variant="h6" component="h2">
                Change Number of Students Limit
              </Typography>
              <TextField className="textFieldColor" variant="outlined" placeholder= {'Current limit is: ' + studentLimit} onChange={(e)=> setNewLimit(e.target.value) }/>
              <Button color = "success" style = {{marginTop: "20px", display: "block"}} variant="contained" onClick={updateLimit}> Update</Button>
            </Box>
        </Modal>
        <Pagination
              style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              color="primary"
              count={Math.ceil(studentsList.length / 10) }
              classes={{ ul: classes.pagination }}
              onChange={(_, value) => {
                setPage(value);
                //window.scroll(0, 450);
              }}
            />
            
            
        </Container>
        </div>
      );
            }
    
  //   return (
  //     <div>
  //         <h1 align="center">Students</h1>

  //         {studentsList.map((val) => {
  //             return <h1 align="center"> Username: {val.USER_NAME} | Email: {val.USER_EMAIL}</h1>
  //         })}
  //     </div>
  //   )
  // };
  

export default TeacherPage;
            
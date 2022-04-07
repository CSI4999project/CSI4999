import React, {useState, useEffect} from "react";
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

const TeacherPage = () => {
    const navigate = useNavigate();
    const [studentsList, setStudentsList] = useState([]);

    //This is the Axios call using that url. The /Students is important here this lets Axios know were grabbing
    //the get request we made in server.js
    //All im doing is getting the response, console logging it, then putting it in setStudentsList array that i made above.
    useEffect(() =>{
        Axios.get("http://localhost:4000/Students").then((response) =>{
        console.log(response.data);
        setStudentsList(response.data);
        })
    }, [])

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

      return (
        <div>
        <Container style={{ textAlign: "center" }}>
          <Typography variant="h4" style={{ padding: 30 }}>
              My Students
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
              {studentsList.map((val) => (
                <TableRow
                  key={studentsList.val}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className={classes.row}
                  
                >
                  <TableCell className={classes.tableCellFont} component="th" scope="row">
                  {val.USER_NAME}
                  </TableCell>
                  <TableCell className={classes.tableCellFont} align="right" onClick = {() => navigate('/Portfolio')}>Richard</TableCell>
                  <TableCell className={classes.tableCellFont} align="right" onClick = {() => navigate('/Portfolio')}>Ray</TableCell>
                  <TableCell className={classes.tableCellFont} align="right" onClick = {() => navigate('/Portfolio')}>{val.USER_EMAIL}</TableCell>
                  <TableCell className={classes.tableCellFont} align="right" >
                    <button onClick ={() => navigate('/Chat')}>Chat</button> | <button>Delete</button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
              style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              color="primary"
              count={10}
              classes={{ ul: classes.pagination }}
              // onChange={(_, value) => {
              //   // setPage(value);
              //   window.scroll(0, 450);
              // }}
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
            
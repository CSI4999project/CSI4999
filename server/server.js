const express = require('express')
require('dotenv').config()
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const cookieparser = require('cookie-parser')
const bcrypt = require('bcrypt')
const session = require('express-session')
const bodyParser = require('body-parser')
var mysql = require('mysql2');
const { request } = require('express');
const app = express()


var connection  = mysql.createConnection({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOSTNAMEDB,
    port: process.env.DBPORT,

})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie:{maxAge: 3600000}
}))

app.use(cookieparser(process.env.SECRET))
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport, connection);


// Routes

app.post("/login", (req, res, next) =>{
    passport.authenticate('local', (err, user, info) =>{
        if(err) throw err;
        if(!user) res.send("Wrong Email or Password");
        else{
            // })
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send({
                    login: "Successfully Authenticated",
                    user: {
                        id: req.user[0]['USER_ID'],
                        username: req.user[0]['USER_NAME'],
                        email: req.user[0]['USER_EMAIL'],
                        type: req.user[0]['USER_TYPE'],
                        firstname: req.user[0]['USER_FIRSTNAME'],
                        lastname: req.user[0]['USER_LASTNAME'],

                      }});
            });
        }
    })(req, res, next)
})



app.post('/joinClass', (req, res)=>{
    connection.execute('SELECT * from PARTY where PARTY_CODE = ?', [req.body.code], (er, result) =>{
        if(result.length === 0){
            res.send('not found')
        } else{
            connection.execute('INSERT INTO MEMBERS (USER_ID, GROUP_ID) values (?,?)', [req.body.id, result[0].PARTY_ID] )
            res.send('user added')
        }
    })
})

app.post('/getCode', (req, res) =>{
    connection.execute('SELECT PARTY_CODE from PARTY where OWNER_ID = ?', [req.body.id], (err, result) =>{
        res.send(result[0].PARTY_CODE)
    })
})
app.post("/isMember", (req, res) =>{
    connection.execute('Select * from MEMBERS where USER_ID = ?', [req.body.userID], (err, result) =>{
        res.send(result)
        console.log('after')
    })
})

app.post("/register", (req, res) =>{
    //Check if user exists
    connection.execute('SELECT USER_EMAIL from Users WHERE USER_EMAIL = ?', [req.body['email']], async (err, results,fields) =>{
        //if user exists return
        if (err) throw err;
        if(results[0] !== undefined){
            res.send('User With Email Already Exists')
        } else if(!results[0]){
            // if new user add user to database and return message
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            connection.execute('INSERT INTO Users (USER_EMAIL, USER_NAME, USER_PASSWORD, USER_TYPE, USER_FIRSTNAME, USER_LASTNAME) VALUES (?, ?, ?, ?, ?, ?)',
                [req.body['email'], req.body['username'], hashedPassword, req.body['usertype'], req.body['firstname'], req.body['lastname']], (err, results, fields) =>{
                    if(req.body['usertype'] === 'Instructor'){
                        connection.execute('SELECT USER_ID FROM Users WHERE USER_EMAIL = ?', [req.body['email']],(err, results,fields) =>{
                            connection.execute('INSERT INTO PARTY (OWNER_ID, PARTY_CODE, PARTY_NAME) VALUES (?, ?, ?)',
                            [results[0]['USER_ID'], Date.now(), 'random'])
                        })
                    } 
                    res.send('User Created')
                })
        }
    })
})


    app.get("/user", (req, res) => {
        try{
            console.log(req.user.id)
            res.send(req.user);
        }  catch{
            console.log('fdf')
            res.send('')
        }
         // The req.user stores the entire user that has been authenticated inside of it.
    });

  app.post('/logout', (req, res) =>{
    req.logOut();
    res.send('logged Out')
  })

  //Using get request, "/Students" is the page where i want the request to execute. 
  //So when you click on students tab it takes you to localhost/Students and thats when this executes
  //Then i use connection.execute to make a mysql command to get the data that i need from database.
  //res.send(result) im just sending the results i get. Now i need to make an axios call on Students page to see these results
  //Go to TeacherPage.js to see Axios call
  app.post("/Students", (req, res) => {
      connection.execute('SELECT * FROM Users INNER JOIN MEMBERS on Users.USER_ID = MEMBERS.USER_ID where GROUP_ID = (select PARTY_ID from PARTY where OWNER_ID = ?)',[req.body.id], (err, result) => {
          console.log(result)
          res.send(result);
      });
    });
    app.post("/coins", (req, res) => {
        console.log(req.body)
        connection.execute('SELECT * from CURRENCY_OWNED where USER_ID = ? and CURRENCY_NAME = ?', [req.body['userID'], req.body['CurrencyName']],(err, results, fields) =>{
            console.log(results);
    if(req.body['Type'] === 0){
            if(results.length === 0){
                if(req.body.Filled == 1) {
                    connection.execute('INSERT into CURRENCY_OWNED (USER_ID, CURRENCY_NAME, DOLLAR_AMOUNT, CURRENCY_PRICE, Currency_Amount, Type, CURRENCY_FULLNAME) values (?, ?, ?, ?, ?, ?, ?)', [req.body['userID'], req.body['CurrencyName'], req.body['DollarAmount'], req.body['Currency_price'], req.body['Currency_Owned'], req.body['Type'], req.body['fullname']]);
                }
                console.log('inside here')
                connection.execute('INSERT into TRANSACTIONS (USER_ID, CURRENCY_NAME, DOLLAR_AMOUNT, CURRENCY_PRICE, Currency_Amount, Type, Filled, STOP_LIMIT, CURRENCY_FULLNAME) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body['userID'], req.body['CurrencyName'], req.body['DollarAmount'], req.body['Currency_price'], req.body['Currency_Owned'], req.body['Type'], req.body['Filled'], req.body['stopPrice'], req.body['fullname']]);
            } else{
                if(req.body.Filled == 1) {
                    connection.execute('UPDATE CURRENCY_OWNED set CURRENCY_AMOUNT = CURRENCY_AMOUNT + ? where USER_ID = ? and CURRENCY_NAME = ?', [req.body['Currency_Owned'], req.body['userID'], req.body['CurrencyName'] ])
                    connection.execute('UPDATE CURRENCY_OWNED set DOLLAR_AMOUNT = DOLLAR_AMOUNT + ? where USER_ID = ? and CURRENCY_NAME = ?', [req.body['DollarAmount'], req.body['userID'], req.body['CurrencyName'] ])
                }
                connection.execute('INSERT into TRANSACTIONS (USER_ID, CURRENCY_NAME, DOLLAR_AMOUNT, CURRENCY_PRICE, Currency_Amount, Type, Filled, STOP_LIMIT, CURRENCY_FULLNAME) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body['userID'], req.body['CurrencyName'], req.body['DollarAmount'], req.body['Currency_price'], req.body['Currency_Owned'], req.body['Type'], req.body['Filled'], req.body['stopPrice'], req.body['fullname']]);
        }
    } else if(req.body['Type'] === 1){
        if(results.length === 0){
            console.log("cannot place sell if you dont own this currency")
        } else{
            if(req.body.Filled == 1 && Number(req.body['Currency_Owned']) <= results[0].Currency_Amount){
                connection.execute('UPDATE CURRENCY_OWNED set CURRENCY_AMOUNT = CURRENCY_AMOUNT - ? where USER_ID = ? and CURRENCY_NAME = ?', [req.body['Currency_Owned'], req.body['userID'], req.body['CurrencyName'] ])
                connection.execute('UPDATE CURRENCY_OWNED set DOLLAR_AMOUNT = DOLLAR_AMOUNT - ? where USER_ID = ? and CURRENCY_NAME = ?', [req.body['DollarAmount'], req.body['userID'], req.body['CurrencyName'] ])
            }
            if(Number(req.body['Currency_Owned']) <= results[0].Currency_Amount){
                connection.execute('INSERT into TRANSACTIONS (USER_ID, CURRENCY_NAME, DOLLAR_AMOUNT, CURRENCY_PRICE, Currency_Amount, Type, Filled, STOP_LIMIT, CURRENCY_FULLNAME) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body['userID'], req.body['CurrencyName'], req.body['DollarAmount'], req.body['Currency_price'], req.body['Currency_Owned'], req.body['Type'], req.body['Filled'], req.body['stopPrice'], req.body['fullname']]);
            }
      
        }
    }
        })
        // 
         res.send("im depressed");
    })

    app.post("/Portfolio", (req, res) => {
        console.log(req.body.userID);
        connection.execute('SELECT * FROM CURRENCY_OWNED where USER_ID = ?', [req.body['userID']], (err, result) => {
            res.send(result);
        });
      });
      app.post("/deleteUser", (req, res) => {
        connection.execute('DELETE FROM MEMBERS WHERE USER_ID = ?', [req.body['userID']], (err, result) => {
            res.send("hellooo");
        });
      });

      app.post("/Portfolio2", (req, res) => {
        connection.execute('SELECT * FROM TRANSACTIONS where USER_ID = ? and Filled = 1', [req.body['userID']], (err, result) => {
            res.send(result);
        });
      });
      app.post("/Portfolio3", (req, res) => {
        connection.execute('SELECT * FROM TRANSACTIONS where USER_ID = ? and Filled = 0', [req.body['userID']], (err, result) => {
            res.send(result);
        });
      });




      app.post("/Portfolio4", (req, res) => {
        connection.execute('UPDATE TRANSACTIONS set Filled = 1 where TRANSACTION_ID = ?', [req.body['TRANSACTION_ID']], (res) =>{
            connection.execute('SELECT * from CURRENCY_OWNED where USER_ID = ? and CURRENCY_NAME = ?', [req.body['userID'], req.body['CURRENCY_NAME']],(err, results, fields) =>{
                console.log(req.body)
                console.log('this is req body')
                if(req.body['TYPE'] == 0){
                    if(results.length === 0){
                        if(req.body.Filled == 1) {
                            console.log('line 207')
                            currAmt = Number(req.body['DOLLAR_AMOUNT']) / Number(req.body['PRICE_AT_EXECUTION']);
                            connection.execute('INSERT into CURRENCY_OWNED (USER_ID, CURRENCY_NAME, DOLLAR_AMOUNT, CURRENCY_PRICE, Currency_Amount, Type, CURRENCY_FULLNAME) values (?, ?, ?, ?, ?, ?, ?)', [req.body['userID'], req.body['CURRENCY_NAME'], req.body['DOLLAR_AMOUNT'], req.body['PRICE_AT_EXECUTION'], currAmt, req.body['TYPE'], req.body['FULLNAME']]);
                        }
                    } else{
                        if(req.body.Filled == 1) {
                            currAmt = Number(req.body['DOLLAR_AMOUNT']) / Number(req.body['PRICE_AT_EXECUTION']);
                            connection.execute('UPDATE CURRENCY_OWNED set CURRENCY_AMOUNT = CURRENCY_AMOUNT + ? where USER_ID = ? and CURRENCY_NAME = ?', [currAmt, req.body['userID'], req.body['CURRENCY_NAME'] ])
                            connection.execute('UPDATE CURRENCY_OWNED set DOLLAR_AMOUNT = DOLLAR_AMOUNT + ? where USER_ID = ? and CURRENCY_NAME = ?', [req.body['DOLLAR_AMOUNT'], req.body['userID'], req.body['CURRENCY_NAME'] ])
                        }
                        
                    }
                } else if(req.body['TYPE'] === '1'){
                    console.log('equals 1')
                    if(results.length === 0){
                        console.log("cannot place sell if you dont own this currency")
                    } else{
                        if(req.body.Filled == 1){
                            
                            
                            currAmt = Number(req.body['DOLLAR_AMOUNT']) / Number(req.body['PRICE_AT_EXECUTION']);
                            if(currAmt > results[0].Currency_Amount){
                                console.log('cant do that')
                                connection.execute('UPDATE TRANSACTIONS set Filled = 0 where TRANSACTION_ID = ?', [req.body['TRANSACTION_ID']])
                            } else{
                                connection.execute('UPDATE CURRENCY_OWNED set CURRENCY_AMOUNT = CURRENCY_AMOUNT - ? where USER_ID = ? and CURRENCY_NAME = ?', [currAmt, req.body['userID'], req.body['CURRENCY_NAME'] ])
                                connection.execute('UPDATE CURRENCY_OWNED set DOLLAR_AMOUNT = DOLLAR_AMOUNT - ? where USER_ID = ? and CURRENCY_NAME = ?', [req.body['DOLLAR_AMOUNT'], req.body['userID'], req.body['CURRENCY_NAME'] ])
                            }
                            
                        }
                        
                  
                    }
                }
            })
        })
        console.log(req.body)
        
      });

    //   app.post('/OwnerID', (req, res) =>{
    //       console.log(req.body.id)
    //       connection.execute('SELECT OWNER_ID from PARTY where PARTY_ID = (select GROUP_ID from MEMBERS WHERE USER_ID = ?)', [req.body.id], (err, res) => {
    //           console.log(res)
    //       })
    //   })
app.listen(4000, () =>{
    console.log('Server Started')
})

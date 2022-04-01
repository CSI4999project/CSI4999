const express = require('express')
require('dotenv').config()
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const cookieparser = require('cookie-parser')
const bcrypt = require('bcrypt')
const session = require('express-session')
const bodyParser = require('body-parser')
var mysql = require('mysql2')
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
                      }});
            });
        }
    })(req, res, next)
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
            connection.execute('INSERT INTO Users (USER_EMAIL, USER_NAME, USER_PASSWORD, USER_TYPE) VALUES (?, ?, ?, ?)',
                [req.body['email'], req.body['username'], hashedPassword, req.body['usertype']], (err, results, fields) =>{
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
  app.get("/Students", (req, res) => {
      connection.execute('SELECT * FROM Users INNER JOIN MEMBERS on Users.USER_ID = MEMBERS.USER_ID where GROUP_ID = (select PARTY_ID from PARTY where OWNER_ID = 16)', (err, result) => {
          res.send(result);
      });
    });
    app.post("/coins", (req, res) => {
        connection.execute('INSERT into CURRENCY_OWNED (USER_ID, CURRENCY_NAME, DOLLAR_AMOUNT, CURRENCY_PRICE, Currency_Amount, Type) values (?, ?, ?, ?, ?, ?)', [req.body['userID'], req.body['CurrencyName'], req.body['DollarAmount'], req.body['Currency_price'], req.body['Currency_Owned'], req.body['Type']]);
        res.send("im depressed");
    })

app.listen(4000, () =>{
    console.log('Server Started')
})

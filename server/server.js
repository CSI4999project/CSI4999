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
                        email: req.user[0]['USER_EMAIL']
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
            connection.execute('INSERT INTO Users (USER_EMAIL, USER_NAME, USER_PASSWORD) VALUES (?, ?, ?)',
                [req.body['email'], req.body['username'], hashedPassword], (err, results, fields) =>{
                    res.send('User Created')
                })
        }
    })
})


    app.get("/user", (req, res) => {
        try{
            
            console.log(req.user)
            console.log('gfgdgfdgd')
            res.send(req.user);
        }  catch{
            console.log('fdf')
            res.send('')
        }
         // The req.user stores the entire user that has been authenticated inside of it.
    });

  app.post('/logout', (req, res) =>{
    console.log(req.user)
    req.logOut();
    console.log(req.user);
    res.send('logged Out')
  })

  app.get("/Students", (req, res) => {
      connection.execute('SELECT * FROM Users INNER JOIN MEMBERS on Users.USER_ID = MEMBERS.USER_ID where GROUP_ID = (select PARTY_ID from PARTY where OWNER_ID = 16)', (err, result) => {
          res.send(result);
      });
    });

app.listen(4000, () =>{
    console.log('Server Started')
})
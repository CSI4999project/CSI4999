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
            req.login(user, (err)=>{
                if(err) throw console.log(err);
                res.cookie('user', {
                    isLoggedIn: true,
                    id: req.user['USER_ID'],
                    username: req.user['USER_NAME']
                }, {maxAge:3600000})
                res.send("Seccessfully Authenticated");
            })
        }
    })(req, res, next)
})

app.get('/logout', (req, res) =>{
    console.log(req.header.cookie)
    req.logOut();
    res.send('loggedOut')
})


app.post("/register", (req, res) =>{
    //Check if user exists
    connection.execute('SELECT USER_EMAIL from Users WHERE USER_EMAIL = ?', [req.body['email']], async (err, results,fields) =>{
        //if user exists return
        if(results[0] !== undefined){
            res.send('User With Email Already Exists')
        } else{
            // if new user add user to database and return message
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            connection.execute('INSERT INTO Users (USER_EMAIL, USER_NAME, USER_PASSWORD) VALUES (?, ?, ?)',
                [req.body['email'], req.body['username'], hashedPassword], (err, results, fields) =>{
                    res.send('User Created')
                })
        }
    })
})



app.listen(4000, () =>{
    console.log('Server Started')
})
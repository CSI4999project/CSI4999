const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport, connection){
    passport.use( new localStrategy({usernameField:'email'}, (email, password, done) =>{
        //look up user in db
        connection.execute('SELECT * from Users WHERE USER_EMAIL = ?', [email], async (err, results,fields) =>{
            if(results[0] === undefined){
                return done(null, false)
            }
            bcrypt.compare(password, results[0]['USER_PASSWORD'],(err, result) =>{
                if(err) throw err;
                if(result === true){
                    return done(null, results[0])
                } else{
                    console.log('not same password')
                    return done(null, false);
                }
            })
        })
        
    }))

    passport.serializeUser((user,cb) => {
        console.log(user['USER_ID'] + ' serial')
        cb(null, user['USER_ID'])
    })
    passport.deserializeUser((id, cb) => {
        console.log('ffffsdfsdfg')
        connection.execute('SELECT * from Users WHERE USER_ID = ?', [id],  (err, results,fields) =>{
            
            const userInformation = {
                id: results[0]['USER_ID']
            };
            console.log(userInformation['id'])
            cb(err, userInformation);
        })
    })
    
}
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport, connection) {
    passport.use(
      new localStrategy({usernameField:'email'},(email, password, done) => {
        //User.findOne({ username: username }, (err, user) => {
        connection.execute('SELECT * from Users WHERE USER_EMAIL = ?', [email], async (err, user) =>{
          if (err) throw err;
          if (!user[0]) return done(null, false);
          bcrypt.compare(password, user[0]['USER_PASSWORD'], (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user);
      });
      passport.deserializeUser((user, cb) => {
        //User.findOne({ _id: id }, (err, user) => {
        connection.execute('SELECT * from Users WHERE USER_ID = ?', [user[0]['USER_ID']], async (err, user) =>{
          console.log(user[0])
          let obj = {
            id: user[0]['USER_ID'],
            username: user[0]['USER_NAME'],
            email: user[0]['USER_EMAIL'],
            type: user[0]['USER_TYPE'],
            
          }
          cb(err, obj);
        });
      });
    };
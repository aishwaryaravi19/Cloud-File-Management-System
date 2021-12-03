const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const keys = require('./keys');


//FB OAuth Strategy
const FacebookStrategy = require('passport-facebook').Strategy;

//Load User Model
const User = require('../domains/user');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy( {usernameField: 'email'}, (email, password, done) => {
            //Match User
            User.findOne( { email: email} )
            .then(user => {
                if(!user){
                    return done(null, false, { message: 'That email is not registered!'});
                }

                //Match Password
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null,user);
                    }
                    else{
                        return done(null, false, { message: 'Password incorrect.'});
                    }
                });
            })
            .catch( err => console.log(err));
        })
    );

    passport.use(
        new FacebookStrategy(
            {
                clientID: keys.faceBookID,
                clientSecret: keys.faceBookSecret,
                callbackURL: "/users/auth/facebook/callback"
            },
            (accessToken, refreshToken, profile, done) => {
                
                const name=profile.displayName;
                const accessToken = accessToken;
                const refreshToken = refreshToken;
                const email='xyz@gmail.com';
                const password=a1b2c3;
                const newUser = new EndUser({
                    name,
                    email,
                    password
                });


                //Hash the password to protect it
                bcrypt.genSalt(10, (err,salt) => 
                   bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if(err) throw err;
                        //set password to hashed password
                        newUser.password=hash;
                        //save user
                        newUser.save()
                        .then(user => {
                            return done(null,user);
                        })
                        .catch(err=>console.log(err));

                   }))
            }
        ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
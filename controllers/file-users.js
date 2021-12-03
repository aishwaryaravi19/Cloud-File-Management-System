const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const passport=require('passport');

//User Model
const User = require('../domains/endusers');

//Register Handle
router.post('/register', (req,res)=>{
    const { name, email, password, confirmpassword} = req.body;
    let errors = [];

    //check for password match
    if(password != confirmpassword){
        errors.push({msg: 'Passwords do not match!'});
    }

    //check for password length
    if(password.length < 6){
        errors.push({ msg: 'Password should be at least 6 characters'});
    }

    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            confirmpassword
        });
    }

    //check for required fields
    if(!name || !email || !password ||!confirmpassword){
        errors.push({ msg:'Please fill in all fields!' });
    }

    else{
        //Validation Passed
        User.findOne({ email:email })
        .then(user => {
            //Check if the user already exists
            if(user){
                errors.push({ msg:'Email is already registered' });
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    confirmpassword
            });
            } else {
                const addUser = new User({
                    name,
                    email,
                    password,
                    level: 'U'
                });

                //Hash password
                bcrypt.genSalt(10, (err,salt) => 
                   bcrypt.hash(addUser.password, salt, (err,hash) => {
                        if(err) throw err;
                        //set password to hashed
                        addUser.password=hash;
                        //save user
                        addUser.save()
                        .then(user => {
                            req.flash('success_msg','You are now registered!!');
                            res.redirect('/users/login');
                        })
                        .catch(err=>console.log(err));

                   }))
            }
        });
    }
});

router.get('/auth/facebook/callback',passport.authenticate('facebook'), (req,res,next) => {
    res.redirect('/dashboard');
});

//Integration with facebook
router.get('/auth/facebook', 
    passport.authenticate('facebook'));

//Handle end user login 
router.post('/login', (req,res, next) => {
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Login Page
router.get('/login',(req,res)=>res.render('login'));

//Register Page
router.get('/register',(req,res)=>res.render('register'));

//Handle end user logout
router.get('/logout',(req,res,next) => {
    req.logout();
    req.flash('success_msg','You are Logged out');
    res.redirect('/users/login');
});

module.exports=router;
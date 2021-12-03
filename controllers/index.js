const express=require('express');
const router=express.Router();
const { ensureAuthenticated }= require('../config/authenticate');

//to get data from tables
const Files = require('../domains/files');
const User = require('../domains/endusers');

//Welcome Page
router.get('/',(req,res)=>res.render('welcome'));

//dahsboard Page
router.get('/dashboard',ensureAuthenticated,(req,res)=>{

    const user =req.user;

    if(req.user.name != 'admin'){

        Files.find({ email : req.user.email },(err, data) => {;
            res.render('dashboard',{
                user: user,
                data: data,
                logins: {}
            })
        })     
    }
    else{
        User.find({ level: { $ne: 'A' }},(err, output) => {
            Files.find({},(err, data) => {
                res.render('dashboard',{
                    user: user,
                    data: data,
                    logins: output
                })
            })
        })
    }

});



module.exports=router;
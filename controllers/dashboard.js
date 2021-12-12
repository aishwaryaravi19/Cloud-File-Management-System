const express=require('express');
const router=express.Router();
const { ensureAuthenticated }= require('../config/authenticate');

//to get data from tables
const Files = require('../models/file');
const User = require('../models/enduser');

//Welcome Page
router.get('/',(req,res)=>res.render('home'));

//dahsboard Page
router.get('/dashboard',ensureAuthenticated,(req,res)=>{

    const user =req.user;

    if(req.user.name != 'admin'){

        Files.find({ email : req.user.email },(err, data) => {;
            res.render('admin-dashboard',{
                user: user,
                data: data,
                logins: {}
            })
        })     
    }
    else{
        User.find({ level: { $ne: 'A' }},(err, output) => {
            Files.find({},(err, data) => {
                res.render('admin-dashboard',{
                    user: user,
                    data: data,
                    logins: output
                })
            })
        })
    }

});



module.exports=router;
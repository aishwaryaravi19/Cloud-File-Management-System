const express=require('express');
const router=express.Router();
const { ensureAuthenticated }= require('./../config/auth');

//to get data from tables
const Files = require('./../models/files');
const User = require('./../models/user');

//Welcome Page
router.get('/',(req,res)=>res.render('welcome'));

//dahsboard Page
router.get('/dashboard',ensureAuthenticated,(req,res)=>{

    const user =req.user;

    if(req.user.name != 'admin'){

        Files.find({ email : req.user.email },(err, data) => {
            //console.log(data);
            res.render('dashboard',{
                user: user,
                data: data,
                logins: {}
            })
        })     
    }
    else{
        User.find({ level: { $ne: 'A' }},(err, output) => {
            // console.log(output);
            Files.find({},(err, data) => {
                //console.log(data);
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
const express = require('express');
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');

const app=express();

//passport config
require('./config/sso')(passport);

//DB config
const db=require('./config/keys').MongoURI;

//connect to Mongo
mongoose.connect(db,{ useNewUrlParser: true})
.then(()=>console.log('MongoDb connected!!'))
.catch(err=>console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//BodyParser
app.use(express.json());
app.use(express.urlencoded({ extented:false}));

//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Middleware for passport
app.use(passport.initialize());
app.use(passport.session());

//connect to flash
app.use(flash());

//Global vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/',require('./controllers/dashboard'));
app.use('/users',require('./controllers/file-users'));
app.use('/upload',require('./controllers/file-upload'));
app.use('/delete',require('./controllers/file-delete'));
app.use('/edit',require('./controllers/file-edit'));

const PORT = process.env.PORT || 3000;

app.listen(PORT,console.log(`Server has started`));

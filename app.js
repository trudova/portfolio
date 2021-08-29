const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const blogRouts = require('./routes/blog');
const commentsRouts = require('./routes/comments');
const projectsRouts = require('./routes/projects');
const contactsRouts = require('./routes/contacts');
const usersRouts = require('./routes/users');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/portpholio',{
    useNewUrlParser: true,
    // useCreateIndex:true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open', ()=>{
    console.log('Database conected')
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig ={
    secret: 'thisismysecret',
    resave:false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires: Date.now() + 1000*360*24*7, //expires after a week
        maxAge:1000*360*24*7
    }
}

app.use(session(sessionConfig))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=>{
    res.locals.admin ='liubovtrudovaapplying@gmail.com';
    res.locals.currentUser = req.user;
     res.locals.success= req.flash('success');
     res.locals.error = req.flash('error');
     next();
});



app.get('/', (req, res)=>{
    res.render('home', {pageTitle:'LIuboV'});
});
app.get('/about', (req, res)=>{
    res.render('other/about', {pageTitle:'About'});
});

// ////////////////USERS/////////////////////////
app.use('/',usersRouts);
///////////////////END OF USERS/////////////////////

//////////////BLOG////////////////////////////////
app.use('/blog', blogRouts);
////////////// END OF BLOG//////////////////////////

//////////////COMMENTS////////////////////////////////
app.use('/blog/:id/comments', commentsRouts);
////////////// END OF COMMENTS////////////////////////

// ///////////////PROJECTS///////////////////////
app.use('/projects', projectsRouts);
// /////////////// END OF PROJECTS//////////////////////

//////////////////////CONTACTS/////////////////////////////
app.use('/contacts',contactsRouts);
//////////////////////END OF CONTACTS//////////////////////

// //////////////////////////////error handeling////////////
app.all('*',(req, res, next)=>{
        next(new ExpressError('Page not found', 404));
})

app.use((err, req, res, next)=>{
    const {statusCode =500, message= 'somthing went wrong'} = err
    res.status(statusCode).render('error',{message, statusCode, pageTitle:'Error'});

}); //catching errors in utils in case anything goes wrong... passing to next to hit middle were and throw an error better aprouch then infinet then() in my opinion


////////////////////// END OF CONTACTS////////////////////////////
app.listen(3000, ()=>{
    console.log("Server runing on port 3000");
});
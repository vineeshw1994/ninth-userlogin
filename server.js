const express =require('express')
const session = require("express-session");
var cookieParser = require('cookie-parser');
const { v4: uuid4 } = require("uuid");
const hbs = require('hbs')
const path = require('path')
const app = express()

//view engine setup
app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// app.use("/static", express.static(path.join(__dirname, "style")));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    if(!req.user)
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate")
    next()
})

app.use(session({
    secret: uuid4(),
    resave: false,
    saveUninitialized:true
}))

const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
const signoutRouter = require('./routes/signout')
const homeRouter = require('./routes/home')
const dashboardRouter = require('./routes/dashboard')
const adminadduserrouer = require('./routes/admin-adduser')
const adminDeleteRouter = require('./routes/admin-deleteuser')
const adminSearchRouter = require('./routes/admin-search')
const admineditRouter = require('./routes/admin_edit')



app.use(loginRouter)
app.use(signupRouter)
app.use(signoutRouter)
app.use(homeRouter)
app.use(dashboardRouter)
app.use(adminadduserrouer)
app.use(adminDeleteRouter)
app.use(adminSearchRouter)
app.use(admineditRouter)



app.listen(3000,()=>{
    console.log('server is created');
})
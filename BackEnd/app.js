
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000
const web = require('./router/route')
const connectDb = require('./Db/connectDb')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser =  require('cookie-parser')
const helmet = require('helmet')
const path = require('path');
const fileUpload = require('express-fileupload')
const flash=require('connect-flash')
const env = require('dotenv').config();

app.use(express.json())
app.use(flash());
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({useTempFiles:true}))
app.use(cors({
    origin: 'https://mern-fullstack-2.onrender.com/',  // Vite (React) frontend
    credentials: true,  // Allow cookies to be sent
}));
app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:true,
    saveUninitialized:false,
   
}));
app.use(cookieParser())
app.use('/',web)
connectDb()  // connect to database

//server run
app.listen(port,()=>
    console.log(`${port} server run successfully`)
)

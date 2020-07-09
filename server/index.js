//  TODO: express-session, cors 등의 미들웨어
const express = require("express");
const cors = require("cors");;
const dotenv = require("dotenv");
dotenv.config();
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const uuid = require('uuid/v4')
const imgController = require('./imgController')
const config = require('./config/config')
const AWS = require('aws-sdk')
const MySQLStore = require('express-mysql-session')(session);

require("./models");

const {
  signInController,
  signUpController,
  signOutController,
  userContoroller,
} = require("./controllers");


let s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  
});

const port = 4000;


app.use(session({
  secret: 'spemnv2395@#lsore*&@#oso3$%^#&#$@#$!',
  resave: false,
  saveUninitialized: true,
  maxAge: 20000,
  store: new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'user'
  })
}));

// !
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

// !
app.get("/signout", signOutController);
app.post("/signin", signInController);
app.post("/signup", signUpController);
app.get("/user", userContoroller);
app.post('/upload',imgController.uploadImageToS3);

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});

module.exports = app;
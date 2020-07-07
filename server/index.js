//  TODO: express-session, cors 등의 미들웨어
const express = require("express");
const cors = require("cors");
const AWS = require("aws-sdk");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const app = express();


require("./models");

const {
  signInController,
  signUpController,
  signOutController,
  userContoroller,
} = require("./controllers");



const port = 4000;

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
});

let s3 = new AWS.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "yourBuecketName",
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
        acl: 'public-read',
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: "public-read-write",
  }),
});

app.post(
    '/upload',
    upload.single('photo'),
    async (req,res,next) => {
      try {
        res.json({ message: req.file });
      } catch (err) {
        console.error(err);
        next(err);
      }
    }
  );

// app.get("/upload", function (req, res, next) {
//   res.render("upload");
// });


app.use(
  session({
    secret: "QuadCore",
    resave: false,
    saveUninitialized: true,
  })
);

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

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});

module.exports = app;

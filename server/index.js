//  TODO: express-session, cors 등의 미들웨어
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multer = require('multer');
const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

// console.log(process.env);

require('./models')

const {
    signInController,
    signUpController,
    signOutController,
    userContoroller
} = require('./controllers')

const app  = express();

const port = 4000;

app.use(session({
    secret: 'QuadCore',
    resave: false,
    saveUninitialized: true,
}))

// ! 
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET','POST'],
    credentials: true
}))

app.use(bodyParser.json())
app.use(cookieParser())

// ! 
app.get('/signout', signOutController);
app.post('/signin', signInController);
app.post('/signup', signUpController);
app.get('/user', userContoroller);

app.post('/up', upload.array('img'), (req, res) => {
    console.log(req.files);
  });
  
app.listen(port, () => {
    console.log(`server listen on ${port}`)
})

module.exports = app;
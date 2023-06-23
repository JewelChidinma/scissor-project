require ('dotenv').config()

const path = require('path')
const express = require('express')
const {connectDB} = require('./db/db')
const {validateUrl, validateUser} = require('./middlewares/validations')
const {addUrl, getUrl, visitUrl} = require('./controllers/urlController')
const {registerUser, getUser} = require('./controllers/usersController')
const {authenticateUser} = require('./controllers/authController')
const {isUserAuthenticated} = require('./middlewares/auth')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

connectDB(process.env.MONGO_STRING)


app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, 'public', './index.html'))
})

//users routes
app.post('/signup', validateUser, registerUser)
app.post('/login', validateUser, authenticateUser)
app.get('/details', isUserAuthenticated, getUser)


//url routes
app.get("/geturl", isUserAuthenticated, getUrl)
  
app.post("/createurl", isUserAuthenticated, validateUrl, addUrl)

app.get("/:url", visitUrl)

app.listen (5000, console.log('Server is running on port 5000'))
require ('dotenv').config()

const express = require('express')
const {connectDB} = require('./db/db')
const {nanoid} = require('nanoid')
const Urls = require('./models/URLSchema')
const {validateUrl} = require('./middlewares/validations')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

connectDB(process.env.MONGO_STRING)


app.get("/", (req, res)=>{
  res.send('welcome!')
})

app.get("/geturl", async(req, res) => {
  let url = await Urls.find()
  
  return res.status(200).json({message: "Url found", data: url})
})

app.post("/createurl", validateUrl, async (req, res)=>{
 console.log(req.body.full_url)


 let urlBody = {
    full_url: req.body.full_url,
    short_url: req.body.custom_url ? req.body.custom_url : nanoid(6)
}

let url = new Urls(urlBody)
url = await url.save()

res.status(201).json({message: "Url created successfully",data: url})

})



app.listen (5000, ()=>{
    console.log('Server is running on port 5000')

})
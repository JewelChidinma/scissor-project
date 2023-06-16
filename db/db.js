const mongoose = require('mongoose')

function connectDB(string){


mongoose.connect(string).then((res)=>{
    console.log("connected to mongoDB")
    }).catch((err)=>{
        console.log(err)
    })

}

module.exports = {connectDB}
const jwt = require('jsonwebtoken')
function isUserAuthenticated(req, res, next){
    let token = req.headers["short-token"]

    if(!token) return res.status(401).json({message: "Unauthorized", data: null})

    try{
        let decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = decoded
        next()

    }catch(err){
        console.log(err.message)
        return res.status(400).json({message: err.message, data: null})
    }
}

module.exports = {isUserAuthenticated}
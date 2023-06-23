const joi = require('joi')

async function validateUrl(req, res, next){
    const schema = joi.object({
        full_url: joi.string().uri().required(),
        custom_url: joi.string()
    })

    let result = schema.validate(req.body)

    if(result.error){
        return res.status(400).json({message: "Validation error", data: result.error.details})
    }

    next()
}

async function validateUser(req, res, next){
    const schema= joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    let result = schema.validate(req.body)

    if(result.error){
        return res.status(400).json({message: "Validation error", data: result.error.details})
    }

    next()
}

module.exports = {validateUrl, validateUser}
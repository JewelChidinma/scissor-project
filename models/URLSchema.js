const mongoose = require ('mongoose')

const URLSchema = new mongoose.Schema({
    full_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('url', URLSchema)
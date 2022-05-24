const mongoose = require('mongoose')

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tiles: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    imagename: {
        type: String,
        required: true
    },
    Tile: {
        type: [
            "Mixed"
        ]
    }
})

module.exports = mongoose.model('Templates', templateSchema)
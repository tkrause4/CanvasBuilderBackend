const mongoose = require('mongoose')

const canvasSchema = new mongoose.Schema({
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
    image: {
        data: Buffer,
        contentType: String,
        required: false
    },
    Tile: [{
        type: String,
        required: false
    }]
})

module.exports = mongoose.model('Canvases', canvasSchema)
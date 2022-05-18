const express = require('express');
const router = express.Router();
const Canvases = require('../models/canvases');
const multer = require('multer');

// Storage
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `CanvasBuilder_${file.originalname}`)
    }
});

const upload = multer ({ storage: Storage }).single('image')

// Getting all Canvases
router.get('/', async (req, res) => {
    try {
        const canvases = await Canvases.find()
        res.json(canvases)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// Getting one Canvas
router.get('/:id', getCanvas, (req, res) => {
    res.send(res.canvas)
})

// Create Canvas
router.post('/', async (req, res) => {
    upload (req, res, async (error) => {
        if (error){
            console.log(error)
        } else {
            const canvases = new Canvases({
                name: req.body.name,
                tiles: req.body.tiles,
                type: req.body.type,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
                Tile: req.body.Tile
            })
            try {
                const newCanvas = await canvases.save()
                res.status(201).json(newCanvas)
            } catch (error) {
                res.status(400).json({message: error.message})
            }
        }
    })
})

// Delete Canvas
router.delete('/:id', getCanvas, async (req, res) => {
    try {
        await res.canvas.remove()
        res.json({message: 'Canvas entfernt'} )
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Update canvas
router.patch('/:id', getCanvas, async (req, res) => {
    if (req.body.name != null) {
        res.canvas.name = req.body.name
    }
    if (req.body.tiles != null) {
        res.canvas.tiles = req.body.tiles
    }
    if (req.body.type != null) {
        res.canvas.type = req.body.type
    }
    if (req.body.Tile != null) {
        res.canvas.Tile = req.body.Tile
    }
    try {
        const updatedCanvas = await res.canvas.save()
        res.json(updatedCanvas)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

async function getCanvas (req, res, next) {
    let canvas
    try {
        canvas = await Canvases.findById(req.params.id)
        if (canvas == null) {
            return res.status(404).json({message: 'Cannot find Canvas'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.canvas = canvas
    next()
}

module.exports = router
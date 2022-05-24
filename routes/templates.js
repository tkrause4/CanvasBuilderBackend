const express = require('express');
const router = express.Router();
const Templates = require('../models/templates');
const multer = require('multer');

// Storage
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer ({
    storage:Storage
}).single('image')

// Getting all Templates
router.get('/', async (req, res) => {
    try {
        const templates = await Templates.find()
        res.json(templates)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

// Getting one Template
router.get('/:id', getTemplate, (req, res) => {
    res.send(res.template)
})

// Create Template
router.post('/', async (req, res) => {
    const templates = new Templates({
        name: req.body.name,
        tiles: req.body.tiles,
        type: req.body.type,
        imagename: req.body.imagename,
        Tile: req.body.Tile
    })
    try {
        const newTemplate = await templates.save()
        res.status(201).json(newTemplate)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Delete Template
router.delete('/:id', getTemplate, async (req, res) => {
    try {
        await res.templates.remove()
        res.json({message: 'Template entfernt'} )
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Update Template
router.patch('/:id', getTemplate, async (req, res) => {
    if (req.body.name != null) {
        res.templates.name = req.body.name
    }
    if (req.body.tiles != null) {
        res.templates.tiles = req.body.tiles
    }
    if (req.body.type != null) {
        res.templates.type = req.body.type
    }
    if (req.body.imagename != null) {
        res.templates.imagename
    }
    if (req.body.Tile != null) {
        res.templates.Tile = req.body.Tile
    }
    try {
        const updatedTemplate = await res.templates.save()
        res.json(updatedCanvas)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

async function getTemplate (req, res, next) {
    let templates
    try {
        templates = await Templates.findById(req.params.id)
        if (templates == null) {
            return res.status(404).json({message: 'Cannot find Template'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.templates = templates
    next()
}

module.exports = router
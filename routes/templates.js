const express = require('express');
const router = express.Router();
const Templates = require('../models/templates');

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
        await res.template.remove()
        res.json({message: 'Template entfernt'} )
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Update Template
router.patch('/:id', getTemplate, async (req, res) => {
    if (req.body.name != null) {
        res.template.name = req.body.name
    }
    if (req.body.tiles != null) {
        res.template.tiles = req.body.tiles
    }
    if (req.body.type != null) {
        res.template.type = req.body.type
    }
    if (req.body.imagename != null) {
        res.template.imagename
    }
    if (req.body.Tile != null) {
        res.template.Tile = req.body.Tile
    }
    try {
        const updatedTemplate = await res.template.save()
        res.json(updatedTemplate)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

async function getTemplate (req, res, next) {
    let template
    try {
        template = await Templates.findById(req.params.id)
        if (template == null) {
            return res.status(404).json({message: 'Cannot find Template'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.template = template
    next()
}

module.exports = router
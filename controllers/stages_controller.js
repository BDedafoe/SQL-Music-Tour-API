// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Stages } = db

// FIND ALL BANDS
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stages.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC BAND
stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stages.findOne({
            where: { band_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A BAND
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stages.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newStage
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A BAND
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stages.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stages.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


// EXPORT
module.exports = stages
const { Router } = require('express');
const { Venue } = require('../models/Venue');

module.exports = Router()
  .get('/', async (req, res) => {
    const venues = await Venue.getAll();
    res.json(venues);
  })
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const venue = await Venue.getById(id);
    return res.json(venue);
  });

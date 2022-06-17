const { Router } = require('express');
const { Venue } = require('../models/Venue');

module.exports = Router()
  .get('/', async (req, res) => {
    const venues = await Venue.getAll();
    res.json(venues);
  });

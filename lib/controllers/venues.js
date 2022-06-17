const { Router } = require('express');
const { Venue } = require('../models/Venue');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const venue = await Venue.insert(req.body);
      res.json(venue);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const venue = await Venue.updateById(id, req.body);
      res.json(venue);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const venue = await Venue.getById(id);
      return res.json(venue);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const venues = await Venue.getAll();
      res.json(venues);
    } catch (e) {
      next(e);
    }
  });

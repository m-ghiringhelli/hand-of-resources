const { Router } = require('express');
const { Beatle } = require('../models/Beatle');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const beatles = await Beatle.getAll();
      res.json(beatles);
    } catch (e) {
      next(e);
    }
  });
